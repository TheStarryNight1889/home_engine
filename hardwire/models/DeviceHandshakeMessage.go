package models

type DeviceHandshake struct {
	DeviceMessage `json:",inline"`
	DeviceType    string `json:"device_type"`
	DeviceVersion string `json:"device_version"`
}
