use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct DeviceMessage<T> {
    timestamp: u64,
    device_id: String,
    data: T,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SensorAir {
    temperature: f32,
    humidity: f32,
    co2: f32,
}
