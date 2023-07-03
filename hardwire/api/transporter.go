package transporter_client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/TheStarryNight1889/home_engine/hardwire/models"
)

type TransporterClient struct {
	Host       string
	Port       string
	HttpClient *http.Client
}

func NewTransporterClient(host string, port string) *TransporterClient {
	return &TransporterClient{
		Host:       host,
		Port:       port,
		HttpClient: &http.Client{},
	}
}

func (tc *TransporterClient) PostAirData(data models.AirData) error {
	u := url.URL{
		Scheme: "http",
		Host:   tc.Host + ":" + tc.Port,
		Path:   "/sensor/air",
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	resp, err := tc.HttpClient.Post(u.String(), "application/json", bytes.NewReader(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Printf("Request sent to server: %s with status: %s and response: %s\n", u.String(), resp.Status, string(body))

	return nil
}

func (tc *TransporterClient) PostDeviceHandshake(data models.DeviceHandshake) error {
	u := url.URL{
		Scheme: "http",
		Host:   tc.Host + ":" + tc.Port,
		Path:   "/device/handshake",
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	resp, err := tc.HttpClient.Post(u.String(), "application/json", bytes.NewReader(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Printf("Request sent to server: %s with status: %s and response: %s\n", u.String(), resp.Status, string(body))

	return nil
}
