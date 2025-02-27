import mqtt, { MqttClient } from 'mqtt';

// Default MQTT broker URL
const DEFAULT_MQTT_BROKER_URL = 'mqtt://localhost:1883';

// List of topics to subscribe to
export const TOPICS = ['device/#', 'sensor/#', 'control/#'];

// Initialize MQTT client
const brokerUrl = process.env.MQTT_BROKER_URL || DEFAULT_MQTT_BROKER_URL;

const client: MqttClient = mqtt.connect(brokerUrl, {
  clientId: `saercore_${Math.random().toString(16).slice(2, 8)}`,
  clean: true,
  reconnectPeriod: 5000,
});

// Connection events
client.on('connect', () => {
  console.log(`Connected to MQTT broker at ${brokerUrl}`);
  
  // Subscribe to topics
  TOPICS.forEach(topic => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to ${topic}:`, err);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });
  });
});

// Message handling
client.on('message', (topic: string, message: Buffer) => {
  try {
    const payload = JSON.parse(message.toString());
    console.log(`Received message on topic ${topic}`);
    // Process message here or emit an event
  } catch (error) {
    console.error(`Failed to parse message from ${topic}:`, error);
  }
});

// Error handling
client.on('error', (err) => {
  console.error('MQTT client error:', err);
});

client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

export default client;