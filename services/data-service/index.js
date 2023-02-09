const express = require('express');
const WebSocket = require('ws')
const app = express();
const bodyParser = require('body-parser');
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'https://eu-central-1-1.aws.cloud2.influxdata.com'

const client = new InfluxDB({url, token})
let org = `molloy.christie@gmail.com`
let bucket = `Sensor`

const writeClient = client.getWriteApi(org, bucket, 'ns')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Data service listening on port 3000');
});

const wss = new WebSocket.Server({ port: 8080 });

// /sensor/air - post data
app.post('/sensor/air', (req, res) => {
    console.log('Received data: ', req.body.data);
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
        writeClient.flush()
        res.status(200).send('OK');
    }
    catch(err){
        console.log(err);
        res.status(500).send('ERROR');
    }
    
});