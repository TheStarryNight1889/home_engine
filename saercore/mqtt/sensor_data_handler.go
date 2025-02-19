package mqtt

import (
	"log"
	"saercore/db/sqlc"
	"saercore/mqtt/topics"

	"github.com/eclipse/paho.golang/paho"
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
	log.Printf("received a message in the sensordataairhandler %s", p)
}
