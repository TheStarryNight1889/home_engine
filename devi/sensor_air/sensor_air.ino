#include <MQTT.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <RTCZero.h>
#include <WiFiUdp.h>
#include "SparkFun_SCD30_Arduino_Library.h"
#include <U8g2lib.h>
#include <SPI.h>

// TODO: move the values to a config file 
const char DEVICE_ID[] = "airsensor1";
const String DEVICE_TYPE = "air_sensor";
const String DEVICE_VERSION = "v0.0.1";

const char WIFI_SSID[] = "CM";
const char WIFI_PASSWORD[] = "fZohpPXggQzYCnLZL9!ZXx_ZqJ";

const char MQTT_BROKER[] = "192.168.0.43";
const int MQTT_PORT = 1883;
const char MQTT_AIR_SENSOR_TOPIC[] = "data/airsensor1/sensor/air";
const char MQTT_LWT_TOPIC[] = "device/airsensor1/lwt";
const char MQTT_LWT_MESSAGE[] = "{\"status\": false}";
const char MQTT_HANDSHAKE_TOPIC[] = "device/airsensor1/handshake";
// Devices
U8G2_SSD1306_128X64_ALT0_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
SCD30 airSensor;

// Connections
RTCZero rtc;
WiFiClient wifiClient;
MQTTClient mqttClient;

// Function declarations
void setInternalClock(RTCZero &rtc);
void setupSCD30(SCD30 &airSensor);
void connectToWifi();
void connectToMqtt();
void publishMessage(String topic, String message);
void displayAirReads(String co2Str, String tempStr, String humStr);
void displayMessage(String message);
String createJSON(String timestamp, String temp, String hum, String co2);

// States
enum State
{
  CONNECTED,
  DISCONNECTED,
};

State state = DISCONNECTED;

void setup()
{
  Serial.begin(9600);
  u8g2.begin();
  Wire.begin();

  delay(8000);
  
  Serial.println("--- Beggining Setup ---");
  displayMessage("Initializing");
  delay(1000);
  displayMessage("Connecting to WiFi");
  connectToWifi();
  displayMessage("Connecting to NTP");
  setInternalClock(rtc);
  displayMessage("Connecting to MQTT");
  connectToMqtt();
  displayMessage("Done");
  delay(1000);

  setupSCD30(airSensor);
  Serial.println("--- End of Setup ---");
}

void loop()
{
  Serial.println("--- PASS START ---");
  switch (state)
  {
    case DISCONNECTED:
      if (WiFi.status() == WL_CONNECTED && mqttClient.connected())
      {
        state = CONNECTED;
      } else {
        if (airSensor.dataAvailable())
        {
          String co2 = String(airSensor.getCO2());
          String hum = String(airSensor.getHumidity());
          String temp = String(airSensor.getTemperature());
          String timestamp = String(rtc.getEpoch());

          String co2Str = "CO2: " + co2;
          String tempStr = "Temp: " + temp;
          String humStr = "Hum: " + hum;
          Serial.println("No Connection -- Printing to screen only");
          displayAirReads(co2Str, tempStr, humStr);
        }
        connectToWifi();
        setInternalClock(rtc);
        connectToMqtt();
      }
    break;
    case CONNECTED:
      if (airSensor.dataAvailable() && WiFi.status() == WL_CONNECTED && mqttClient.connected())
      {
        String co2 = String(airSensor.getCO2());
        String hum = String(airSensor.getHumidity());
        String temp = String(airSensor.getTemperature());
        String timestamp = String(rtc.getEpoch());

        String co2Str = "CO2: " + co2;
        String tempStr = "Temp: " + temp;
        String humStr = "Hum: " + hum;

        Serial.println("Connected -- Printing & Publishing");
        displayAirReads(co2Str, tempStr, humStr);
        mqttClient.loop();
        String jsonData = createJSON(timestamp, temp, hum, co2);
        publishMessage(MQTT_AIR_SENSOR_TOPIC, jsonData);
      } else{
        state = DISCONNECTED;
      }
      break;
  default:
    break;
  }
  Serial.println("--- PASS END ---");
  delay(4000);
}

void setInternalClock(RTCZero &rtc)
{
  rtc.begin();
  unsigned long epoch = 0;
  int numberOfTries = 0;
  const int maxTries = 60;

  Serial.println("Connecting to NTP server");

  while (epoch == 0 && numberOfTries < maxTries)
  {
    epoch = WiFi.getTime();
    Serial.println(numberOfTries);
    numberOfTries++;
    delay(500);
  }

  if (numberOfTries == maxTries)
  {
    Serial.println("NTP Server connection failed");
  }
  else
  {
    Serial.println("NTP Server connected ");
    rtc.setEpoch(epoch);
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

void connectToWifi()
{
  Serial.print("Connecting to WiFi network ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int attempts = 0;
  while (attempts < 3 && WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("WiFi connected");
  }
  else
  {
    Serial.println("WiFi connection failed");
  }
}

void connectToMqtt()
{
  Serial.print("Connecting to MQTT broker at ");
  Serial.print(MQTT_BROKER);
  Serial.print(":");
  Serial.println(MQTT_PORT);

  int attempts = 0;
  mqttClient.begin(MQTT_BROKER, MQTT_PORT, wifiClient);
  mqttClient.setWill(MQTT_LWT_TOPIC, MQTT_LWT_MESSAGE, false, 1);
  while (attempts < 3 && !mqttClient.connected())
  {
    mqttClient.connect(DEVICE_ID, false);
    delay(500);
    attempts++;
  }

  if (mqttClient.connected())
  {
    Serial.println("MQTT connected");
    publishMessage(MQTT_HANDSHAKE_TOPIC, createHandshakeJSON(DEVICE_TYPE, DEVICE_VERSION));
  }
  else
  {
    Serial.println("MQTT connection failed");
  }
}
void publishMessage(String topic, String message)
{
  mqttClient.publish(topic, message);
}

void displayAirReads(String co2Str, String tempStr, String humStr)
{
    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_ncenB08_tr);
    u8g2.drawStr(0, 10, co2Str.c_str());
    u8g2.drawStr(0, 20, tempStr.c_str());
    u8g2.drawStr(0, 30, humStr.c_str());
    u8g2.sendBuffer();
}

void displayMessage(String message){
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_ncenB08_tr);
  u8g2.drawStr(0, 10, message.c_str());
  u8g2.sendBuffer();
}

String createJSON(String timestamp, String temp, String hum, String co2) {
  String jsonData = "{\n\"timestamp\": " + timestamp + 
  ",\n\"data\": {\n\"temperature\": " + temp +
  ",\n\"humidity\": " + hum +
  ",\n\"co2\": " + co2 +
  "\n}\n}";
  
  return jsonData;
}

String createHandshakeJSON(String deviceType, String deviceVersion) {
  String jsonData = "{\"device_type\": \"" + deviceType + "\"" +
  ",\n\"device_version\": \"" + deviceVersion + "\"" +
  "\n}";
  
  return jsonData;
}
