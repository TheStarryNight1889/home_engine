package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"saercore/config"
	"saercore/db/sqlc"
	"saercore/http"
	"saercore/http/middleware"
	"saercore/mqtt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func loadEnvVars() {
	if err := config.Load(); err != nil {
		log.Fatal("Could not load env file")
	}
}

func startDbPool() *pgxpool.Pool {
	dbConnectionString := os.Getenv("DB_CONN")
	ctx := context.Background()

	dbpool, err := pgxpool.New(ctx, dbConnectionString)
	if err != nil {
		log.Println(err)
		log.Fatal("Could not connect to the database")
	}
	log.Println("Connected to database")
	return dbpool
}

func createMux(querier *db.Queries) *http.ServeMux {
	deviceHandler := handler.NewDeviceHandler(querier)
	locationHandler := handler.NewLocationHandler(querier)
	sensorAirHandler := handler.NewSensorAirHandler(querier)

	mux := http.NewServeMux()
	deviceHandler.RegisterRoutes(mux)
	locationHandler.RegisterRoutes(mux)
	sensorAirHandler.RegisterRoutes(mux)

	return mux
}

func createMqttHandlers(mqttClient *mqtt.MqttClient, querier *db.Queries) {
	sensorDataHandler := mqtt.NewSensorDataHandler(querier, mqttClient)
	sensorDataHandler.RegisterSensorDataHandlers()
}

func startHttpServer(mux *http.ServeMux) {
	serverPort := os.Getenv("SERVER_PORT")
	server := &http.Server{
		Addr:    ":" + serverPort,
		Handler: middleware.Use(mux, middleware.Logger, middleware.Json),
	}

	log.Fatal(server.ListenAndServe())

}

func main() {
	loadEnvVars()

	dbPool := startDbPool()
	defer dbPool.Close()

	querier := db.New(dbPool)
	mux := createMux(querier)

	mqttClient := mqtt.NewMqttClient()

	createMqttHandlers(mqttClient, querier)

	startHttpServer(mux)
}
