#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <RTCZero.h>
#include <WiFiUdp.h>

#include "SparkFun_SCD30_Arduino_Library.h"
SCD30 airSensor;
RTCZero rtc;

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = "PorqueFi";        // your network SSID (name)
char pass[] = "BecauseFiSaid0k"; // your network password (use for WPA, or use as key for WEP)

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "192.168.0.10";
int port = 1883;
const char sensor_topic[] = "data/sensor/air";

const String device_id = "airsensor1";

// set interval for sending messages (milliseconds)
const long interval = 5000;
unsigned long previousMillis = 0;

int count = 0;

void setup()
{
  // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED)
  {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  delay(10000);
  Serial.println("WIFI Connected");

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port))
  {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1)
      ;
  }
  Serial.println("MQTT Connected");

  rtc.begin();
  unsigned long epoch;
  int numberOfTries = 0, maxTries = 6;

  do
  {
    Serial.println(WiFi.getTime());
    epoch = WiFi.getTime();
    numberOfTries++;
  }

  while ((epoch == 0) && (numberOfTries < maxTries));
  if (numberOfTries == maxTries)
  {
    Serial.print("NTP unreachable!!");
    while (1)
      ;
  }
  else
  {
    Serial.print("Epoch received: ");
    Serial.println(epoch);
    rtc.setEpoch(epoch);
    Serial.println();
  }

  Serial.begin(115200);
  Wire.begin();

  if (airSensor.begin() == false)
  {
    Serial.println("Air sensor not detected. Please check wiring. Freezing...");
    while (1)
      ;
  }

  Serial.println("Setting measurment interval...");
  airSensor.setMeasurementInterval(2);
  delay(200);
  Serial.println("Done!");

  Serial.println("Setting altitude...");
  airSensor.setAltitudeCompensation(13);
  delay(200);
  Serial.println("Done!");
}

void loop()
{
  // call poll() regularly to allow the library to send MQTT keep alive which
  // avoids being disconnected by the broker
  mqttClient.poll();

  Serial.println(airSensor.dataAvailable());

  if (airSensor.dataAvailable())
  {
    String co2 = String(airSensor.getCO2());
    String hum = String(airSensor.getHumidity());
    String temp = String(airSensor.getTemperature());
    String timestamp = String(rtc.getEpoch());

    mqttClient.beginMessage(sensor_topic);
    mqttClient.println(
        "{\n\"timestamp\": " + timestamp + 
        ",\n\"device_id\": " + device_id +
        ",\n\"co2\": " + co2 +
        ",\n\"humidity\": " + hum +
        ",\n\"temperature\": " + temp +
        "\n}");
    mqttClient.endMessage();
  }
  else
  {
    mqttClient.beginMessage(sensor_topic);
    mqttClient.print("null");
    mqttClient.print("null");
    mqttClient.print("null");
    mqttClient.endMessage();
  }
  // save the last time a message was sent
  delay(5000);
}