DROP TABLE IF EXISTS sensor_air_data;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS locations;

DROP TRIGGER IF EXISTS set_timestamp ON devices;
DROP TRIGGER IF EXISTS set_timestamp ON locations;

DROP FUNCTION IF EXISTS trigger_set_timestamp;

DROP TYPE IF EXISTS device_type;
