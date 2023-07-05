package mqtt

import (
	"encoding/json"
	"log"
	"strings"

	transporter_client "github.com/TheStarryNight1889/home_engine/hardwire/api"
	"github.com/TheStarryNight1889/home_engine/hardwire/models"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type Handlers struct {
	TransportClient *transporter_client.TransporterClient
}

func (h *Handlers) SensorAirHandler(client mqtt.Client, msg mqtt.Message) {
	data := models.AirData{}
	err := json.Unmarshal(msg.Payload(), &data)
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
	err = h.TransportClient.PostAirData(data)
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
}

func (h *Handlers) DeviceHandshakeHandler(client mqtt.Client, msg mqtt.Message) {
	data := models.DeviceHandshake{}
	err := json.Unmarshal(msg.Payload(), &data)
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
	err = h.TransportClient.PostDeviceHandshake(data)
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
}

func (h *Handlers) DeviceLWTHandler(client mqtt.Client, msg mqtt.Message) {
	data := models.DeviceLWT{}
	topic := msg.Topic()
	deviceID := strings.Split(topic, "/")[1]
	err := json.Unmarshal(msg.Payload(), &data)
	data.DeviceID = deviceID
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
	err = h.TransportClient.PostDeviceLWT(data)
	if err != nil {
		log.Printf("Error = %s\n", err)
	}
}
