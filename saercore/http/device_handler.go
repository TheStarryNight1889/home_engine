package handler

import (
	"encoding/json"
	"net/http"
	"saercore/db/sqlc"
)

type DeviceHandler struct {
	queries *db.Queries
}

func NewDeviceHandler(q *db.Queries) *DeviceHandler {
	return &DeviceHandler{queries: q}
}

func (c *DeviceHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/devices", c.GetDevices)
	mux.HandleFunc("GET /api/devices/{id}", c.GetDevice)

	mux.HandleFunc("POST /api/devices", c.CreateDevice)

	mux.HandleFunc("PUT /api/devices/{id}", c.UpdateDevice)

	mux.HandleFunc("DELETE /api/devices/{id}", c.DeleteDevice)
}

func (c *DeviceHandler) GetDevices(w http.ResponseWriter, r *http.Request) {
	devices, err := c.queries.GetDevices(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(devices)
}

func (c *DeviceHandler) GetDevice(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	device, err := c.queries.GetDevice(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(device)
}

func (c *DeviceHandler) CreateDevice(w http.ResponseWriter, r *http.Request) {
	var device db.CreateDeviceParams
	err := json.NewDecoder(r.Body).Decode(&device)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newDevice, err := c.queries.CreateDevice(r.Context(), &device)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(newDevice)
}

func (c *DeviceHandler) UpdateDevice(w http.ResponseWriter, r *http.Request) {
	var device db.UpdateDeviceParams
	err := json.NewDecoder(r.Body).Decode(&device)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updatedDevice, err := c.queries.UpdateDevice(r.Context(), &device)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(updatedDevice)
}

func (c *DeviceHandler) DeleteDevice(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	device, err := c.queries.DeleteDevice(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(device)
}
