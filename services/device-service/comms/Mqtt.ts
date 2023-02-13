import mqtt from 'mqtt';

class Mqtt {
    private client: mqtt.Client;
    private handlers: { [topic: string]: (topic: string, message: Buffer) => void } = {};

    constructor(brokerUrl: string) {
        this.client = mqtt.connect(brokerUrl);
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
        this.client.on('message', (topic, message) => {
            this.handleMessage(topic, message);
        });
    }
    private handleMessage(topic: string, message: Buffer) {
        const handler = this.handlers[topic];
        if (handler) {
            handler(topic, message);
        }
    }

    subscribe(topic: string, handler: (topic: string, message: Buffer) => void) {
        this.handlers[topic] = handler;
        this.client.subscribe(topic);
    }
}

export default Mqtt;