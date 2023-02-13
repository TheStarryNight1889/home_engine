module.exports = {
    mqttBrokerHost: process.env.MQTT_BROKER_HOST || 'localhost',
    mqttBrokerPort: process.env.MQTT_BROKER_PORT || 1883,
    dataServiceHost: process.env.DATA_SERVICE_HOST || 'localhost',
    dataServicePort: process.env.DATA_SERVICE_PORT || 3000,
};
