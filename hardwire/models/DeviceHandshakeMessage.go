package models

type DeviceHandshake struct {
	DeviceID      string `json:"device_id"`
	DeviceType    string `json:"device_type"`
	DeviceVersion string `json:"device_version"`
}
