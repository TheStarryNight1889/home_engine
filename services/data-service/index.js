const express = require('express');
const WebSocket = require('ws')
const app = express();
const bodyParser = require('body-parser');
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
    res.status(200).send('OK');
});