import Mqtt from './comms/Mqtt';
import { MqttHandlers } from './comms/MqttHandlers';

const config = require('./config');

const dataServiceUrl = `http://${config.dataServiceHost}:${config.dataServicePort}`;

const mqtt: Mqtt = new Mqtt(`mqtt://${config.mqttBrokerHost}:${config.mqttBrokerPort}`);

mqtt.subscribe('data/+/+', (topic: string, message: Buffer) => {
    MqttHandlers.fowardToApi(topic, message, dataServiceUrl);
});