mod handlers;
mod types;

use warp::{self, http::Method, Filter};

#[tokio::main]
async fn main() {
    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(&[Method::GET, Method::POST])
        .allow_headers(vec!["content-type"]);

    let sensor_air_create = warp::post()
        .and(warp::path!("sensor" / "air"))
        .and(warp::body::json())
        .and_then(handlers::sensor_air::create)
        .with(cors);

    warp::serve(sensor_air_create)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
