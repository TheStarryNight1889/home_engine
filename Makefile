# -------------------- #
# ------Services------ #
# -------------------- #

mqtt-up:
	docker compose -f services/mqtt-broker/docker-compose.yaml up -d

mqtt-down:
	docker compose -f services/mqtt-broker/docker-compose.yaml down
	