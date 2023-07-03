package models

type DeviceHandshake struct {
	DeviceMessage
	DeviceType    string
	DeviceVersion string
}
