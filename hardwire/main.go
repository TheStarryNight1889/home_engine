package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	transporter_client "github.com/TheStarryNight1889/home_engine/hardwire/api"
	"github.com/TheStarryNight1889/home_engine/hardwire/env"
	"github.com/TheStarryNight1889/home_engine/hardwire/models"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	env := env.NewEnv()
	transportClient := transporter_client.NewTransporterClient(env.TransporterHost, env.TransporterPort)

	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("tcp://%s:%s", env.MqttHost, env.MqttPort))
	opts.SetClientID(env.MqttClientID)
	opts.SetKeepAlive(5 * time.Second)
	opts.SetDefaultPublishHandler(func(client mqtt.Client, msg mqtt.Message) {
		if msg.Topic() == env.MqttSensorAir {
			data := models.AirData{}
			err := json.Unmarshal(msg.Payload(), &data)
			if err != nil {
				log.Printf("Error = %s\n", err)
			}
			err = transportClient.PostAirData(data)
			if err != nil {
				log.Printf("Error = %s\n", err)
			}
		}
		if msg.Topic() == env.MqttDeviceHandshake {
			data := models.DeviceHandshake{}
			err := json.Unmarshal(msg.Payload(), &data)
			if err != nil {
				log.Printf("Error = %s\n", err)
			}
			err = transportClient.PostDeviceHandshake(data)
			if err != nil {
				log.Printf("Error = %s\n", err)
			}
		}
	})

	client := mqtt.NewClient(opts)
	token := client.Connect()
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	token = client.Subscribe(env.MqttSensorAir, 0, nil)
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	for {
		time.Sleep(1 * time.Second)
	}
}
