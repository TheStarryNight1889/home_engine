const config = require('./config').default;
const mqtt = require('mqtt');

try{
  const client  = mqtt.connect({
    host: config.server,
    port: config.port,
    password: config.password,
    username: config.username
  });
  client.on('connect', async () => {
    console.log(`Succesfully Connected to MQTT ${config.username}@${config.server}:${config.port}`)
    while(true) {
      let generatedData = generateData(airSchema);
      let payload = {
        version: 1.0,
        timestamp: new Date().getTime(),
        device_id: '12345',
        location_id: '56789',
        ...generatedData
      }
      client.publish(airTopic, JSON.stringify(payload));
      console.log(`Published to ${airTopic} with payload ${JSON.stringify(payload)}`)
      await new Promise(r => setTimeout(r, 2000));
    }
  })
} catch(err){
  console.log(err);
}
const airTopic = 'data/sensor/air'
const airSchema = [
  {
    name: 'temperature',
    minRange: 20,
    maxRange: 25
  },
  {
    name: 'co2',
    minRange: 400,
    maxRange: 1200
  },
  {
    name: 'humidity',
    minRange: 40,
    maxRange: 80
  }
]

const generateData = (schema) => {
  const result = {}

  schema.forEach(key => {
    result[key.name] = Math.floor(Math.random() * key.maxRange) + key.minRange;
  });

  return result;

}