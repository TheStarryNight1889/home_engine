.PHONY: migrate-up migrate-down migrate-create sqlc

DB_URL ?= postgres://root:root@127.0.0.1:5432/saercore?sslmode=disable



# MIGRATIONS
migrate-up:
	migrate -database "$(DB_URL)" -path db/migrations up

migrate-down:
	migrate -database "$(DB_URL)" -path db/migrations down

migrate-create:
	@read -p "Enter migration name: " name; \
	migrate create -ext sql -dir db/migrations -seq $$name

migrate-reset:
	migrate -database "$(DB_URL)" -path db/migrations drop -f

sqlc:
	sqlc generate
