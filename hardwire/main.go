package main

import (
	"log"
	"time"

	transporter_client "github.com/TheStarryNight1889/home_engine/hardwire/api"
	"github.com/TheStarryNight1889/home_engine/hardwire/env"
	"github.com/TheStarryNight1889/home_engine/hardwire/mqtt"
)

func main() {
	env := env.NewEnv()
	transportClient := transporter_client.NewTransporterClient(env.TransporterHost, env.TransporterPort)
	handlers := &mqtt.Handlers{TransportClient: transportClient}

	mqttOp := mqtt.NewMqtt(env.MqttClientID, env.MqttHost, env.MqttPort)
	token := mqttOp.Connect()
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	token = mqttOp.Subscribe(env.MqttSensorAir, 0, handlers.SensorAirHandler)
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	token = mqttOp.Subscribe(env.MqttDeviceHandshake, 0, handlers.DeviceHandshakeHandler)
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	token = mqttOp.Subscribe(env.MqttDeviceLWT, 0, handlers.DeviceLWTHandler)
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	for {
		time.Sleep(1 * time.Second)
	}
}
