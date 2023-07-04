package mqtt

import (
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type MqttOp struct {
	Client mqtt.Client
}

func NewMqtt(clientId string, mqttHost string, mqttPort string) *MqttOp {
	opts := mqtt.NewClientOptions()
	opts.AddBroker("tcp://" + mqttHost + ":" + mqttPort)
	opts.SetClientID(clientId)
	opts.SetKeepAlive(5 * time.Second)
	mqttOp := &MqttOp{
		Client: mqtt.NewClient(opts),
	}

	return mqttOp
}

func (m *MqttOp) Connect() mqtt.Token {
	return m.Client.Connect()
}

func (m *MqttOp) Subscribe(topic string, qos byte, callback mqtt.MessageHandler) mqtt.Token {
	return m.Client.Subscribe(topic, qos, callback)
}
