use rumqttc::{AsyncClient, MqttOptions, QoS};
use serde::{Deserialize, Serialize};
use std::{str, time::Duration};

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
const DATA_SENSOR_AIR: &str = "data/sensor/air";
const DATA_SERVICE_AIR_URL: &str = "http://localhost:3000/sensor/air";

async fn foward_data(
    data: &str,
    url: &str,
    http_client: &reqwest::Client,
) -> Result<(), Box<dyn std::error::Error>> {
    let message: DeviceMessage<AirData> = serde_json::from_str(data)?;
    let resp = http_client.post(url).json(&message).send().await?;
    println!(
        "Request sent to server: {:?} with status: {:?}",
        url,
        resp.status()
    );
    Ok(())
}
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let sub_list = vec![DATA_SENSOR_AIR];

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

    loop {
        let notification = connection.poll().await;
        match notification {
            Ok(rumqttc::Event::Incoming(rumqttc::Packet::Publish(p))) => match p.topic.as_str() {
                DATA_SENSOR_AIR => {
                    let payload = str::from_utf8(&p.payload).unwrap();

                    let resp = foward_data(payload, DATA_SERVICE_AIR_URL, &http_client).await;
                    match resp {
                        Ok(_) => {}
                        Err(e) => println!("Error = {:?}", e),
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
}
