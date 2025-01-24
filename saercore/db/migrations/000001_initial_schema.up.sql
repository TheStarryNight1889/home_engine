CREATE TYPE device_type AS ENUM ('SENSOR_AIR', 'SENSOR_SOIL');

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE locations (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE devices (
    id VARCHAR(255) PRIMARY KEY,
    location_id VARCHAR(255),
    name VARCHAR(255),
    type device_type NOT NULL,
    version VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON devices
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE sensor_airs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(255) NOT NULL,
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2),
    co2 DECIMAL(5, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
