package mqtt

import (
	"log"
	"saercore/mqtt/topics"

	"github.com/eclipse/paho.golang/paho"
)

func RegisterSensorDataHandlers(mc *MqttClient) {
	mc.RegisterHandler(topics.DataSensorAir, sensorDataAirHandler)
}

func sensorDataAirHandler(p *paho.Publish) {
	log.Printf("received a message in the sensordataairhandler %s", p)
}
