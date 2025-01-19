.PHONY: migrate-up migrate-down migrate-create sqlc

# Get database URL from environment or use default
DB_URL ?= postgres://postgres:password@localhost:5432/yourdb?sslmode=disable


# MIGRATIONS
migrate-up:
	migrate -database "$(DB_URL)" -path db/migrations up

migrate-down:
	migrate -database "$(DB_URL)" -path db/migrations down

migrate-create:
	@read -p "Enter migration name: " name; \
	migrate create -ext sql -dir db/migrations -seq $$name

sqlc:
	sqlc generate
