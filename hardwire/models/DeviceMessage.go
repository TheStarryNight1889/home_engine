package models

type DeviceMessage struct {
	Timestamp uint64 `json:"timestamp"`
	DeviceID  string `json:"device_id"`
}
