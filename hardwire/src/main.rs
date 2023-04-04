use rumqttc::{AsyncClient, MqttOptions, QoS};
use serde::{Deserialize, Serialize};
use std::{env, str, time::Duration};

#[derive(Serialize, Deserialize)]
struct DeviceMessage<T> {
    timestamp: u64,
    device_id: String,
    location_id: String,
    data: T,
}
#[derive(Serialize, Deserialize)]
struct AirData {
    temperature: f32,
    humidity: f32,
    co2: f32,
}

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
    let mqtt_host: String = env::var("MQTT_HOST").expect("MQTT_HOST environment variable not set");
    let mqtt_port: String = env::var("MQTT_PORT").expect("MQTT_PORT environment variable not set");
    let mqtt_client_id: String =
        env::var("MQTT_CLIENT_ID").expect("MQTT_CLIENT_ID environment variable not set");
    let mqtt_sensor_air: String =
        env::var("MQTT_SENSOR_AIR").expect("MQTT_SENSOR_AIR environment variable not set");
    let transporter_host: String =
        env::var("TRANSPORTER_HOST").expect("TRANSPORTER_HOST environment variable not set");
    let transporter_port: String =
        env::var("TRANSPORTER_PORT").expect("TRANSPORTER_PORT environment variable not set");

    let sub_list = vec![&mqtt_sensor_air];

    let http_client = reqwest::Client::new();
    let mut mqttoptions =
        MqttOptions::new(mqtt_client_id, mqtt_host, mqtt_port.parse::<u16>().unwrap());
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
            Ok(rumqttc::Event::Incoming(rumqttc::Packet::Publish(p))) => match p.topic {
                mqtt_sensor_air => {
                    let payload = str::from_utf8(&p.payload).unwrap();

                    let url = format!(
                        "http://{}:{}{}",
                        transporter_host, transporter_port, mqtt_sensor_air
                    );

                    let resp = foward_data(payload, &url, &http_client).await;
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
