package handler

import (
	"encoding/json"
	"net/http"
	"saercore/db/sqlc"
)

type SensorAirHandler struct {
	queries *db.Queries
}

func NewSensorAirHandler(q *db.Queries) *SensorAirHandler {
	return &SensorAirHandler{queries: q}
}

func (c *SensorAirHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/sensor-airs", c.GetSensorAirs)
	mux.HandleFunc("GET /api/sensor-airs/{id}", c.GetSensorAir)

	mux.HandleFunc("POST /api/sensor-airs", c.CreateSensorAir)

	mux.HandleFunc("DELETE /api/sensor-airs/{id}", c.DeleteSensorAir)
}

func (c *SensorAirHandler) GetSensorAirs(w http.ResponseWriter, r *http.Request) {
	sensorAirs, err := c.queries.GetSensorAirs(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(sensorAirs)
}

func (c *SensorAirHandler) GetSensorAir(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	sensorAir, err := c.queries.GetSensorAir(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(sensorAir)
}

func (c *SensorAirHandler) CreateSensorAir(w http.ResponseWriter, r *http.Request) {
	var sensorAir db.CreateSensorAirParams
	err := json.NewDecoder(r.Body).Decode(&sensorAir)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newSensorAir, err := c.queries.CreateSensorAir(r.Context(), &sensorAir)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(newSensorAir)
}

func (c *SensorAirHandler) DeleteSensorAir(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	sensorAir, err := c.queries.DeleteSensorAir(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(sensorAir)
}
