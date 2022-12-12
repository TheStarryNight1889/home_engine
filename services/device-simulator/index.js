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
      client.publish(airTopic, JSON.stringify(generateData(airSchema)))
      await new Promise(r => setTimeout(r, 2000));
    }
  })
} catch(err){
  console.log(err);
}
const airTopic = 'sensor/1234/bedr1'
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