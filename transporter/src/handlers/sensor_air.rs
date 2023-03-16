use crate::types::data::{DeviceMessage, SensorAir};
use axum::Extension;
use axum::{http::StatusCode, Json};
use tokio::sync::broadcast::Sender;

pub async fn create_and_publish(
    tx: Extension<Sender<String>>,
    Json(sensor_air): Json<DeviceMessage<SensorAir>>,
) -> (StatusCode, Json<DeviceMessage<SensorAir>>) {
    match publish_ws(&sensor_air, tx).await {
        Ok(_) => {}
        Err(e) => println!("Error = {:?}", e),
    };
    println!("{:?}", sensor_air);
    (StatusCode::CREATED, Json(sensor_air))
}
async fn publish_ws(
    sensor_air: &DeviceMessage<SensorAir>,
    tx: Extension<Sender<String>>,
) -> Result<(), Box<dyn std::error::Error>> {
    tx.send("Hello Broadcasting".to_string());
    println!("Publishing ws");
    Ok(())
}
