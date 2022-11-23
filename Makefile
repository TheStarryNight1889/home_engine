# -------------------- #
# ------Services------ #
# -------------------- #

mqtt-up:
	docker compose -f services/docker-compose.yaml up mosquitto -d

mqtt-down:
	docker compose -f services/docker-compose.yaml down mosquitto