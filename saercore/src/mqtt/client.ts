import mqtt, { MqttClient } from 'mqtt';

const DEFAULT_MQTT_BROKER_URL = 'mqtt://localhost:1883';

export const TOPICS = ['data/sensor/air/+'];

class MqttService {
  private client: MqttClient;

  constructor(
    private readonly brokerUrl: string = process.env.MQTT_BROKER_URL || DEFAULT_MQTT_BROKER_URL
  ) {
    this.client = mqtt.connect(this.brokerUrl, {
      clientId: `saercore_${Math.random().toString(16).slice(2, 8)}`,
      clean: true,
      reconnectPeriod: 5000,
    });
  }

  public registerHandlers() {
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('error', this.onError.bind(this));
    this.client.on('close', this.onClose.bind(this));
  }

  private onConnect() {
    console.log(`Connected to MQTT broker`);

    TOPICS.forEach((topic) => {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Failed to subscribe to ${topic}:`, err);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });
    });
  }

  private onMessage(topic: string, message: Buffer) {
    try {
      const payload = JSON.parse(message.toString());
      console.log(`Received message on topic ${topic}`, payload);
    } catch (error) {
      console.error(`Failed to parse message from ${topic}:`, error);
    }
  }

  private onError(err: Error) {
    console.error('MQTT client error:', err);
  }

  private onClose() {
    console.log('Disconnected from MQTT broker');
  }

  public getClient() {
    return this.client;
  }
}

export default MqttService;
