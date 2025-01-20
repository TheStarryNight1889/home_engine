-- name: GetDevices :many
SELECT * FROM devices;

-- name: GetDevice :one
SELECT * FROM devices WHERE id = $1;

-- name: CreateDevice :one
INSERT INTO devices (id, location_id, name, type, version) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: UpdateDevice :one
UPDATE devices SET location_id = $2, name = $3, type = $4, version = $5 WHERE id = $1 RETURNING *;

-- name: DeleteDevice :one
DELETE FROM devices WHERE id = $1 RETURNING *;

