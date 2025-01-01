-- timescale db seed file

\c bengine;

CREATE TABLE IF NOT EXISTS airs (
    time timestamptz, 
    device_id varchar(255),
    temperature float,
    humidity float,
    co2 float
);

CREATE INDEX IF NOT EXISTS idx_airs_device_time ON airs (device_id, time DESC);

CREATE TABLE IF NOT EXISTS devices (
    device_id varchar(255),
    device_type varchar(255),
    device_version varchar(255),
    connection_status boolean,
    last_seen timestamp
);