package handler

import (
	"encoding/json"
	"net/http"
	"saercore/db/sqlc"
)

type LocationHandler struct {
	queries *db.Queries
}

func NewLocationHandler(q *db.Queries) *LocationHandler {
	return &LocationHandler{queries: q}
}

func (c *LocationHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/locations", c.GetLocations)
	mux.HandleFunc("GET /api/locations/{id}", c.GetLocation)

	mux.HandleFunc("POST /api/locations", c.CreateLocation)

	mux.HandleFunc("PUT /api/locations/{id}", c.UpdateLocation)

	mux.HandleFunc("DELETE /api/locations/{id}", c.DeleteLocation)
}

func (c *LocationHandler) GetLocations(w http.ResponseWriter, r *http.Request) {
	locations, err := c.queries.GetLocations(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(locations)
}

func (c *LocationHandler) GetLocation(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	location, err := c.queries.GetLocation(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(location)
}

func (c *LocationHandler) CreateLocation(w http.ResponseWriter, r *http.Request) {
	var location db.CreateLocationParams
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newLocation, err := c.queries.CreateLocation(r.Context(), &location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(newLocation)
}

func (c *LocationHandler) UpdateLocation(w http.ResponseWriter, r *http.Request) {
	var location db.UpdateLocationParams
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updatedLocation, err := c.queries.UpdateLocation(r.Context(), &location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(updatedLocation)
}

func (c *LocationHandler) DeleteLocation(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	location, err := c.queries.DeleteLocation(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(location)
}
