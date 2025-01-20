-- name: GetLocations :many
SELECT * FROM locations;

-- name: GetLocation :one
SELECT * FROM locations WHERE id = $1;

-- name: CreateLocation :one
INSERT INTO locations (id, name) VALUES ($1, $2) RETURNING *;

-- name: UpdateLocation :one
UPDATE locations SET name = $1 RETURNING *;

-- name: DeleteLocation :one
DELETE FROM locations WHERE id = $1 RETURNING *;

