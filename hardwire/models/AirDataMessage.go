package models

type AirData struct {
	DeviceMessage
	Temperature float32
	Humidity    float32
	Co2         float32
}
