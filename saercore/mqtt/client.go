package mqtt

import (
	"context"
	"encoding/json"
	"log"
	"net/url"
	"os"

	"github.com/eclipse/paho.golang/autopaho"
	"github.com/eclipse/paho.golang/paho"
)

func getUrl() *url.URL {
	const mqttUrlStr = "MQTT_URL"
	mqttUrl := os.Getenv(mqttUrlStr)
	url, err := url.Parse(mqttUrl)
	if err != nil {
		log.Fatal("Could not parse" + mqttUrlStr)
	}
	return url
}

func getClientID() string {
	const clientIdStr = "MQTT_CLIENT_ID"
	clientId := os.Getenv(clientIdStr)
	return clientId

}

type MqttClient struct {
	ctx          context.Context
	client       *autopaho.ConnectionManager
	clientConfig autopaho.ClientConfig
	router       *paho.StandardRouter
}

func NewMqttClient() *MqttClient {
	router := paho.NewStandardRouter()
	ctx := context.Background()
	u := getUrl()
	clientConfig := autopaho.ClientConfig{
		ServerUrls:                    []*url.URL{u},
		KeepAlive:                     20,
		CleanStartOnInitialConnection: false,
		SessionExpiryInterval:         60,
		OnConnectionUp: func(cm *autopaho.ConnectionManager, c *paho.Connack) {
			log.Println("Connected to MQTT Broker")
			if _, err := cm.Subscribe(ctx, &paho.Subscribe{
				Subscriptions: []paho.SubscribeOptions{
					{Topic: "test/test", QoS: 1},
				},
			}); err != nil {
				log.Fatal("failed to subscribe to topics. exiting...")
			}
			log.Println("subscribed to topics")
		},
		OnConnectError: func(err error) { log.Fatal("error whilst attempting connection") },
		ClientConfig: paho.ClientConfig{
			ClientID: getClientID(),
			OnPublishReceived: []func(paho.PublishReceived) (bool, error){
				func(pr paho.PublishReceived) (bool, error) {
					router.Route(pr.Packet.Packet())
					return true, nil
				}},
			OnClientError: func(err error) { log.Printf("client error: %s\n", err) },
			OnServerDisconnect: func(d *paho.Disconnect) {
				if d.Properties != nil {
					log.Printf("server requested disconnect: %s\n", d.Properties.ReasonString)
				} else {
					log.Printf("server requested disconnect; reason code: %d\n", d.ReasonCode)
				}
			},
		},
	}

	client, err := autopaho.NewConnection(ctx, clientConfig)
	if err != nil {
		panic(err)
	}
	if err = client.AwaitConnection(ctx); err != nil {
		panic(err)
	}

	return &MqttClient{
		client:       client,
		clientConfig: clientConfig,
		ctx:          ctx,
		router:       router,
	}
}

func (mc *MqttClient) Publish(qos int8, topic string, payload any) error {
	bytes, err := json.Marshal(payload)
	ctx := context.Background()
	if err != nil {
		return err
	}

	if _, err = mc.client.Publish(context.Background(), &paho.Publish{
		QoS:     1,
		Topic:   topic,
		Payload: bytes,
	}); err != nil {
		if ctx.Err() == nil {
			panic(err) // Publish will exit when context cancelled or if something went wrong
		}
	}

	ctx.Done()
	return nil
}
