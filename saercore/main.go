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

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	if err := config.Load(); err != nil {
		log.Fatal("Could not load env file")
	}
	dbConn := os.Getenv("DB_CONN")
	serverPort := os.Getenv("SERVER_PORT")

	ctx := context.Background()

	dbpool, err := pgxpool.New(ctx, dbConn)
	if err != nil {
		log.Println(err)
		log.Fatal("Could not connect to the database")
	}
	defer dbpool.Close()

	queries := db.New(dbpool)

	deviceHandler := handler.NewDeviceHandler(queries)
	locationHandler := handler.NewLocationHandler(queries)
	sensorAirHandler := handler.NewSensorAirHandler(queries)

	mux := http.NewServeMux()
	deviceHandler.RegisterRoutes(mux)
	locationHandler.RegisterRoutes(mux)
	sensorAirHandler.RegisterRoutes(mux)

	server := &http.Server{
		Addr:    ":" + serverPort,
		Handler: middleware.Use(mux, middleware.Logger, middleware.Json),
	}

	log.Fatal(server.ListenAndServe())
}
