-- timescale db seed file

CREATE NEW DATABASE IF NOT EXISTS `bengine`;
USE `bengine`;

CREATE NEW TABLE IF NOT EXISTS `airs` (
    time timestamptz, 
    device_id varchar(255),
    temperature float,
    humidity float,
    co2 float,
);

CREATE INDEX ON `airs` (device_id, time DESC);

CREATE NEW TABLE IF NOT EXISTS `devices` (
    device_id varchar(255),
    device_type varchar(255),
    device_version varchar(255),
    connection_status varchar(255),
    last_seen timestamp(255),
);