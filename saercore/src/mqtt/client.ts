import mqtt, { MqttClient } from 'mqtt';

const DEFAULT_MQTT_BROKER_URL = 'mqtt://localhost:1883';

type TopicHandler = (topic: string, message: Buffer) => Promise<void>;

class MqttService {
  private client: MqttClient;
  private topicHandlerMap: Record<string, TopicHandler>;

  constructor(
    private readonly brokerUrl: string = process.env.MQTT_BROKER_URL || DEFAULT_MQTT_BROKER_URL
  ) {
    this.topicHandlerMap = {};
    this.client = mqtt.connect(this.brokerUrl, {
      clientId: `saercore_${Math.random().toString(16).slice(2, 8)}`,
      clean: true,
      reconnectPeriod: 5000,
    });
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('error', this.onError.bind(this));
    this.client.on('close', this.onClose.bind(this));
  }

  public registerHandler(topic: string, handler: TopicHandler) {
    try {
      this.topicHandlerMap[topic] = handler;
      this.subscribe(topic);
    } catch (err) {
      console.error(`Failed to register handler for toipic: ${topic}:`, err);
    }
  }

  private subscribe(topic: string) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to ${topic}:`, err);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });
  }

  private onConnect() {
    console.log(`Connected to MQTT broker`);
  }

  private async onMessage(topic: string, message: Buffer) {
    try {
      // TODO:  this is a poor way of doing it. some sort of regex matcher would probably be better but im too lazy
      const topicSegments = topic.split('/');
      delete topicSegments[3];
      const topicMatch = topicSegments.join('/') + '+';
      console.log(topicMatch);
      const handler: TopicHandler = this.topicHandlerMap[topicMatch];
      if (!handler) {
        console.warn(`Failed to find handler for topic:  ${topic}:`);
        return;
      }
      await handler(topic, message);
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
