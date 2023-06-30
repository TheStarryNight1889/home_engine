#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <RTCZero.h>
#include <WiFiUdp.h>
#include "SparkFun_SCD30_Arduino_Library.h"
#include <U8g2lib.h>
#include <SPI.h>
#include "MQTTConnection.h"
#include "WiFiConnection.h"
#include "MQTTPublisher.h"

// TODO: move the values to a config file 
const char WIFI_SSID[] = "PorqueFi";
const char WIFI_PASSWORD[] = "BecauseFiSaid0k";

const char MQTT_BROKER[] = "192.168.0.69";
const int MQTT_PORT = 1883;
const char MQTT_AIR_SENSOR_TOPIC[] = "data/sensor/air";

const String DEVICE_ID = "airsensor1";
const String DEVICE_LOCATION_ID = "home";

U8G2_SSD1306_128X64_ALT0_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
SCD30 airSensor;
RTCZero rtc;

// Wifi connection
WiFiConnection wifiConnection(WIFI_SSID, WIFI_PASSWORD);
wifiConnection.connect();
WiFiClient& wifiClient = wifiConnection.getClient();

// Mqtt connection
MQTTConnection mqttConnection(wifiClient, MQTT_BROKER, MQTT_PORT);
mqttConnection.connect();
MqttClient& mqttClient = mqttConnection.getClient();

// Mqtt publisher
MQTTPublisher mqttPublisher(mqttClient);

void set_internal_clock(RTCZero &rtc)
{
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
}

void setupSCD30(SCD30 &airSensor)
{
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

void setup()
{
  u8g2.begin();

  set_internal_clock(rtc);

  Serial.begin(115200);
  Wire.begin();

  setupSCD30(airSensor);
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

    String co2Str = "CO2: " + co2;
    String tempStr = "Temp: " + temp;
      String humStr = "Hum: " + hum;
    
    u8g2.clearBuffer();                   // clear the internal memory
    u8g2.setFont(u8g2_font_ncenB08_tr);   // choose a suitable font
    u8g2.drawStr(0, 10, co2Str.c_str());    // write CO2 to the internal memory
    u8g2.drawStr(0, 20, tempStr.c_str());   // write Temp to the internal memory
    u8g2.drawStr(0, 30, humStr.c_str());    // write Hum to the internal memory
    u8g2.sendBuffer();                    // transfer internal memory to the display

    mqttClient.beginMessage(MQTT_AIR_SENSOR_TOPIC);
    String jsonData = "{\n\"timestamp\": " + String(timestamp) + 
    ",\n\"device_id\": \"" + DEVICE_ID + "\"" +
    ",\n\"location_id\": \"" + DEVICE_LOCATION_ID + "\"" +
    ",\n\"data\": {\n\"temperature\": " + String(temp) +
    ",\n\"humidity\": " + String(hum) +
    ",\n\"co2\": " + String(co2) +
    "\n}\n}";

    mqttClient.println(jsonData);
    mqttClient.endMessage();
  }
  else
  {
    mqttClient.beginMessage(MQTT_AIR_SENSOR_TOPIC);
    mqttClient.print("null");
    mqttClient.print("null");
    mqttClient.print("null");
    mqttClient.endMessage();
  }
  // save the last time a message was sent
  delay(5000);
}