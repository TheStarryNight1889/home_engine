package mqtt

import (
	"log"

	"github.com/eclipse/paho.golang/paho"
)

func RegisterSensorDataHandlers(mc *MqttClient) {
	mc.RegisterHandler("data/sensor/air", sensorDataAirHandler)
}

func sensorDataAirHandler(p *paho.Publish) {
	log.Printf("received a message in the sensordataairhandler %s", p.Payload)
}
