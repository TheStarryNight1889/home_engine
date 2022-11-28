# -------------------- #
# ------Services------ #
# -------------------- #

# -------------------- #
all-services-up:
	docker-compose -f services/docker-compose.yaml up -d

all-services-down:
	docker-compose -f services/docker-compose.yaml down
# -------------------- #
mqtt-up:
	docker compose -f services/docker-compose.yaml up mosquitto -d

mqtt-down:
	docker compose -f services/docker-compose.yaml down mosquitto
# -------------------- #
mongo-up:
	docker compose -f services/docker-compose.yaml up mongo -d

mongo-down:
	docker compose -f services/docker-compose.yaml down mongo
# -------------------- #

