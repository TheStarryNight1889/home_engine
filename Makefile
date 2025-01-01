.PHONY: start stop db mqtt logs

start:
	docker compose build
	docker compose up -d

stop:
	docker compose down --remove-orphans

db:
	docker compose stop timescaledb
	docker compose up -d timescaledb

mqtt:
	docker compose stop mosquitto
	docker compose up -d mosquitto

logs:
	docker compose logs -f
