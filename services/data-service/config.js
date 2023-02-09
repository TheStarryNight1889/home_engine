module.exports = {
    influxUrl: process.env.INFLUX_URL || 'https://eu-central-1-1.aws.cloud2.influxdata.com',
    influxOrg: process.env.INFLUX_ORG || 'molloy.christie@gmail.com',
    influxToken: process.env.INFLUX_TOKEN || 'NiceTryHacker',
    influxSensorBucket: process.env.INFLUX_SENSOR_BUCKET || 'Sensor',
    wsPort: process.env.WS_PORT || 8080,
}