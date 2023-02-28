const express = require('express');
const WebSocket = require('ws')
const config = require('./config');
const app = express();
const bodyParser = require('body-parser');
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = config.influxToken
const url = config.influxUrl

const client = new InfluxDB({url, token})

const writeClient = client.getWriteApi(config.influxOrg, config.influxSensorBucket, 'ns')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Data service listening on port 3000');
});

const wss = new WebSocket.Server({ port: config.wsPort });

// /sensor/air - post data
app.post('/sensor/air', (req, res) => {
    console.log('Received data: ', req.body);
    // emit the payload to all clients via websocket
    wss.clients.forEach(client => {
        client.send(JSON.stringify(req.body.data));
    });
    try{
        let data = req.body.data;
        let point = new Point('air')
        .floatField('co2', data.co2)
        .floatField('humidity', data.humidity)
        .floatField('temperature', data.temperature)
        .tag('location', 'office')
        .tag('device', data.device_id)
        .timestamp(new Date(data.timestamp*1000))
        console.log(point);
        writeClient.writePoint(point)
        writeClient.flush(true)
        res.status(200).send('OK');
    }
    catch(err){
        console.log(err);
        res.status(500).send('ERROR');
    }
    
});