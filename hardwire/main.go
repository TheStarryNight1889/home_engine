package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/joho/godotenv"
)

type DeviceMessage struct {
	Timestamp  uint64
	DeviceID   string
	LocationID string
	Data       AirData
}

type AirData struct {
	Temperature float32
	Humidity    float32
	Co2         float32
}

func forwardData(data []byte, url string, client *http.Client) error {
	msg := DeviceMessage{}
	err := json.Unmarshal(data, &msg)
	if err != nil {
		return err
	}

	resp, err := client.Post(url, "application/json", bytes.NewReader(data))
	if err != nil {
		return err
	}

	fmt.Printf("Request sent to server: %s with status: %s\n", url, resp.Status)

	return nil
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	mqttHost := os.Getenv("MQTT_HOST")
	if mqttHost == "" {
		log.Fatal("MQTT_HOST environment variable not set")
	}

	mqttPort := os.Getenv("MQTT_PORT")
	if mqttPort == "" {
		log.Fatal("MQTT_PORT environment variable not set")
	}

	mqttClientID := os.Getenv("MQTT_CLIENT_ID")
	if mqttClientID == "" {
		log.Fatal("MQTT_CLIENT_ID environment variable not set")
	}

	mqttSensorAir := os.Getenv("MQTT_SENSOR_AIR")
	if mqttSensorAir == "" {
		log.Fatal("MQTT_SENSOR_AIR environment variable not set")
	}

	transporterHost := os.Getenv("TRANSPORTER_HOST")
	if transporterHost == "" {
		log.Fatal("TRANSPORTER_HOST environment variable not set")
	}

	transporterPort := os.Getenv("TRANSPORTER_PORT")
	if transporterPort == "" {
		log.Fatal("TRANSPORTER_PORT environment variable not set")
	}

	url := fmt.Sprintf("http://%s:%s/sensor/air", transporterHost, transporterPort)

	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("tcp://%s:%s", mqttHost, mqttPort))
	opts.SetClientID(mqttClientID)
	opts.SetKeepAlive(5 * time.Second)
	opts.SetDefaultPublishHandler(func(client mqtt.Client, msg mqtt.Message) {
		if msg.Topic() == mqttSensorAir {
			httpClient := &http.Client{}
			err := forwardData(msg.Payload(), url, httpClient)
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

	token = client.Subscribe(mqttSensorAir, 0, nil)
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	for {
		time.Sleep(1 * time.Second)
	}
}
