const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const axios = require('axios');

// subscribe to topic data/+/+
client.subscribe('data/+/+');

// listen for messages
client.on('message', (topic, message) => {
    const type = topic.split('/')[1];
    const subType = topic.split('/')[2];
    const url = `http://localhost:3000/${type}/${subType}`;
    console.log(message.toString());
    const data = JSON.parse(message.toString());

    console.log(url); 

    axios.post(url, {
        data
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err.response);
    });

});
