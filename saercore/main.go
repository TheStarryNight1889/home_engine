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

	deviceQueries := db.New(dbpool)

	deviceHandler := handler.NewDeviceHandler(deviceQueries)

	mux := http.NewServeMux()
	deviceHandler.RegisterRoutes(mux)

	server := &http.Server{
		Addr: ":" + serverPort,
		// if i need to add more middleware in the future, i can do something like this
		// https://www.reddit.com/r/golang/comments/1aoxlsr/middleware_in_go_1220/
		Handler: middleware.Logger(mux),
	}

	log.Fatal(server.ListenAndServe())
}
