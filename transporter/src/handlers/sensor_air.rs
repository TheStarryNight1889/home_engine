use crate::types::data::{DeviceMessage, SensorAir};
use warp::{self, http::StatusCode};

pub async fn create(
    sensor_air: DeviceMessage<SensorAir>,
) -> Result<impl warp::Reply, warp::Rejection> {
    println!("{:?}", sensor_air);
    Ok(StatusCode::CREATED)
}
pub async fn publish_ws(
    sensor_air: DeviceMessage<SensorAir>,
) -> Result<impl warp::Reply, warp::Rejection> {
    println!("{:?}", sensor_air);
    Ok(StatusCode::CREATED)
}
