-- name: GetSensorAirs :many
SELECT * FROM sensor_airs;

-- name: GetSensorAir :one
SELECT * FROM sensor_airs WHERE id = $1;

-- name: CreateSensorAir :one
INSERT INTO sensor_airs (device_id, temperature, humidity, co2) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateSensorAir :one
UPDATE sensor_airs SET device_id = $2, temperature = $3, humidity = $4, co2 = $5 WHERE id = $1 RETURNING *;

-- name: DeleteSensorAir :one
DELETE FROM sensor_airs WHERE id = $1 RETURNING *;

