package mqtt

import (
	"context"
	"encoding/json"
	"log"
	"saercore/db/sqlc"
	"saercore/mqtt/topics"
	"strings"

	"github.com/eclipse/paho.golang/paho"
	"github.com/jackc/pgx/v5/pgtype"
)

type SensorDataHandler struct {
	queries    *db.Queries
	mqttClient *MqttClient
}

func NewSensorDataHandler(q *db.Queries, mc *MqttClient) *SensorDataHandler {
	return &SensorDataHandler{queries: q, mqttClient: mc}
}

func (s *SensorDataHandler) RegisterSensorDataHandlers() {
	s.mqttClient.RegisterHandler(topics.DataSensorAir, s.sensorDataAirHandler)
}

func (s *SensorDataHandler) sensorDataAirHandler(p *paho.Publish) {
	topicSegments := strings.Split(p.Topic, "/")
	var payload struct {
		Data struct {
			Temperature float32 `json:"temperature"`
			Humidity    float32 `json:"humidity"`
			Co2         float32 `json:"co2"`
		} `json:"data"`
		Timestamp string `json:"timestamp"`
	}
	err := json.Unmarshal(p.Payload, &payload)
	if err != nil {
		log.Printf("Error unmarshaling JSON: %v", err)
		return
	}

	deviceId := topicSegments[len(topicSegments)-1]
	var temp, hum, co2 pgtype.Numeric

	if err := temp.Scan(payload.Data.Temperature); err != nil {
		log.Printf("Error scanning temperature: %v", err)
		return
	}
	if err := hum.Scan(payload.Data.Humidity); err != nil {
		log.Printf("Error scanning humidity: %v", err)
		return
	}
	if err := co2.Scan(payload.Data.Co2); err != nil {
		log.Printf("Error scanning co2: %v", err)
		return
	}

	sensorData := db.CreateSensorAirParams{
		DeviceID:    deviceId,
		Temperature: temp,
		Humidity:    hum,
		Co2:         co2,
	}
	log.Printf("Temperature value: %+v", temp)
	log.Printf("Humidity value: %+v", hum)
	log.Printf("CO2 value: %+v", co2)

	s.queries.CreateSensorAir(context.Background(), &sensorData)
}
