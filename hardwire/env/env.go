package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	MqttHost            string
	MqttPort            string
	MqttClientID        string
	MqttSensorAir       string
	MqttDeviceHandshake string
	TransporterHost     string
	TransporterPort     string
}

func LoadEnv() error {
	err := godotenv.Load()
	if err != nil {
		return err
	}

	return nil
}

func GetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("%s environment variable not set", key)
	}
	return val
}

func NewEnv() *Env {
	err := LoadEnv()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	env := &Env{
		MqttHost:            GetEnv("MQTT_HOST"),
		MqttPort:            GetEnv("MQTT_PORT"),
		MqttClientID:        GetEnv("MQTT_CLIENT_ID"),
		MqttSensorAir:       GetEnv("MQTT_SENSOR_AIR"),
		MqttDeviceHandshake: GetEnv("MQTT_DEVICE_HANDSHAKE"),
		TransporterHost:     GetEnv("TRANSPORTER_HOST"),
		TransporterPort:     GetEnv("TRANSPORTER_PORT"),
	}

	return env
}
