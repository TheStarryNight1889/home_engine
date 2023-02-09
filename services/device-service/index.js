const config = require('./config');

const mqtt = require('mqtt');
const client = mqtt.connect(`mqtt://${config.mqttBrokerHost}:${config.mqttBrokerPort}`);
const axios = require('axios');

// subscribe to topic data/+/+
client.subscribe('data/+/+');

// listen for messages
client.on('message', (topic, message) => {
    const type = topic.split('/')[1];
    const subType = topic.split('/')[2];
    const url = `http://${config.dataServiceHost}:${config.dataServicePort}/${type}/${subType}`;

    // where the message string contains 'airsensor1' wrap it in quotes
    const fixed = message.toString().replace(/airsensor1/g, '"airsensor1"');
    console.log(fixed);
    const data = JSON.parse(fixed);

    console.log(url); 

    axios.post(url, {
        data
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err.response);
    });

});
