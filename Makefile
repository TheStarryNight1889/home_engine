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
float:
	docker-compose -f services/docker-compose.yaml up -d
# run home-engine-app
	cd apps/home-engine-app && pnpm dev
# run home-engine-configuration-service
	cd services/home-engine-configuration-service && pnpm start:dev
# run device-message-service
	cd services/device-message-service && pnpm start:dev
# run clean-data-service
	cd services/clean-data-service && pnpm start:dev
