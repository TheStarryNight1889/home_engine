#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <RTCZero.h>
#include <WiFiUdp.h>
#include "SparkFun_SCD30_Arduino_Library.h"
#include <U8g2lib.h>
#include <SPI.h>
#include "lib/WiFi/WiFiConnection.h"
#include "lib/MQTT/MQTTConnection.h"
#include "lib/MQTT/MQTTPublisher.h"


U8G2_SSD1306_128X64_ALT0_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

SCD30 airSensor;
RTCZero rtc;

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = "PorqueFi";        // your network SSID (name)
char pass[] = "BecauseFiSaid0k"; // your network password (use for WPA, or use as key for WEP)

MqttClient mqttClient(wifiClient);

const char broker[] = "192.168.0.69";
int port = 1883;
const char sensor_topic[] = "data/sensor/air";

const String device_id = "airsensor1";
const String location_id = "home";

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
  // Wifi connection
  WiFiConnection wifiConnection(ssid, pass);
  wifiConnection.connect();
  WiFiClient& wifiClient = wifiConnection.getClient();

  MQTTConnection mqttConnection(wifiClient, broker, port);
  mqttConnection.connect();
  MqttClient& mqttClient = mqttConnection.getClient();

  MQTTPublisher mqttPublisher(mqttClient);


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

    mqttClient.beginMessage(sensor_topic);
    String jsonData = "{\n\"timestamp\": " + String(timestamp) + 
    ",\n\"device_id\": \"" + device_id + "\"" +
    ",\n\"location_id\": \"" + location_id + "\"" +
    ",\n\"data\": {\n\"temperature\": " + String(temp) +
    ",\n\"humidity\": " + String(hum) +
    ",\n\"co2\": " + String(co2) +
    "\n}\n}";

    mqttClient.println(jsonData);
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