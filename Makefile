.PHONY: start stop db mqtt logs

start:
	docker compose -f build/docker-compose.yaml build
	docker compose -f build/docker-compose.yaml up -d

stop:
	docker compose -f build/docker-compose.yaml down --remove-orphans

db:
	docker compose -f build/docker-compose.yaml stop timescaledb
	docker compose -f build/docker-compose.yaml up -d timescaledb

mqtt:
	docker compose -f build/docker-compose.yaml stop mosquitto
	docker compose -f build/docker-compose.yaml up -d mosquitto

logs:
	docker compose -f build/docker-compose.yaml logs
