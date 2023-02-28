use rumqttc::{AsyncClient, MqttOptions, QoS};
use serde::{Deserialize, Serialize};
use std::{str, time::Duration};
use tokio::{task, time};

#[derive(Serialize, Deserialize)]
struct DeviceMessage<T> {
    timestamp: u64,
    device_id: String,
    data: T,
}
#[derive(Serialize, Deserialize)]
struct AirData {
    temperature: f32,
    humidity: f32,
    co2: f32,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let sub_list = vec!["data/sensor/air"];

    let http_client = reqwest::Client::new();
    let mut mqttoptions = MqttOptions::new("hardwire", "192.168.0.10", 1883);
    mqttoptions.set_keep_alive(Duration::from_secs(5));

    let (client, mut connection) = AsyncClient::new(mqttoptions, 10);

    for &sub in sub_list.iter() {
        let r = client.subscribe(sub, QoS::AtMostOnce).await;
        match r {
            Ok(_) => println!("Subscribed to {:?}", sub),
            Err(e) => println!("Error = {:?}", e),
        }
    }

    while let notification = connection.poll().await {
        match notification {
            Ok(rumqttc::Event::Incoming(rumqttc::Packet::Publish(p))) => match p.topic.as_str() {
                "data/sensor/air" => {
                    let payload = str::from_utf8(&p.payload).unwrap();
                    let message: DeviceMessage<AirData> = serde_json::from_str(payload).unwrap();

                    let resp = http_client
                        .post("http://localhost:3000/sensor/air")
                        .json(&message)
                        .send()
                        .await;
                    match resp {
                        Ok(resp) => {
                            println!(
                                "Request sent to server: {:?} with status: {:?}",
                                "http://localhost:3000/sensor/air",
                                resp.status()
                            )
                        }
                        Err(e) => {
                            println!("Error = {:?}", e);
                            continue;
                        }
                    }
                }
                _ => {}
            },
            Err(e) => {
                println!("Error = {:?}", e);
                continue;
            }
            _ => {}
        }
    }
    Ok(())
}
