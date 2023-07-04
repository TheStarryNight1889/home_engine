package models

type Data struct {
	Temperature float32 `json:"temperature"`
	Humidity    float32 `json:"humidity"`
	Co2         float32 `json:"co2"`
}

type AirData struct {
	DeviceMessage `json:",inline"`
	Data          `json:"data"`
}

/*
sample json:
{
	"device_id": "1234567890",
	"location_id": "1234567890",
	"timestamp": "2019-01-01T00:00:00Z",
	"data": {
		"temperature": 25.0,
		"humidity": 50.0,
		"co2": 1000.0
	}
}
*/
