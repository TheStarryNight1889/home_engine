# home_engine
Home automation platforom designed for Raspberry PI & Arduino

# Architecture
![Architecture](/docs/images/init_arch.png)

## Data
Device emits a payload containing information about itself (metadata) and a payload

### Raw Data
Raw data is ingested by `device-message-service` and saved to mongodb. 