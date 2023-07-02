#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <RTCZero.h>
#include <WiFiUdp.h>
#include "SparkFun_SCD30_Arduino_Library.h"
#include <U8g2lib.h>
#include <SPI.h>

// TODO: move the values to a config file 
const char WIFI_SSID[] = "PorqueFi";
const char WIFI_PASSWORD[] = "BecauseFiSaid0k";

const char MQTT_BROKER[] = "192.168.0.69";
const int MQTT_PORT = 1883;
const char MQTT_AIR_SENSOR_TOPIC[] = "data/sensor/air";

const String DEVICE_ID = "airsensor1";
const String DEVICE_LOCATION_ID = "home";

// Devices
U8G2_SSD1306_128X64_ALT0_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
SCD30 airSensor;

// Connections
RTCZero rtc;
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

// Function declarations
void setInternalClock(RTCZero &rtc);
void setupSCD30(SCD30 &airSensor);
void connectToWifi();
void connectToMqtt();
void publishMessage(String topic, String message);
void displayAirReads(String co2Str, String tempStr, String humStr);
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
  delay(10000);
  Serial.println("--- Beggining Setup ---");
  connectToWifi();
  connectToMqtt();

  u8g2.begin();

  setInternalClock(rtc);

  Wire.begin();

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
        mqttClient.poll();
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

void connectToWifi()
{
  Serial.print("Connecting to ");
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
  mqttClient.connect(MQTT_BROKER, MQTT_PORT);
  while (attempts < 3 && !mqttClient.connected())
  {
    delay(500);
    attempts++;
  }

  if (mqttClient.connected())
  {
    Serial.println("MQTT connected");
  }
  else
  {
    Serial.println("MQTT connection failed");
  }
}
void publishMessage(String topic, String message)
{
  mqttClient.beginMessage(topic);
  mqttClient.println(message);
  mqttClient.endMessage();
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

String createJSON(String timestamp, String temp, String hum, String co2) {
  String jsonData = "{\n\"timestamp\": " + timestamp + 
  ",\n\"device_id\": \"" + DEVICE_ID + "\"" +
  ",\n\"location_id\": \"" + DEVICE_LOCATION_ID + "\"" +
  ",\n\"data\": {\n\"temperature\": " + temp +
  ",\n\"humidity\": " + hum +
  ",\n\"co2\": " + co2 +
  "\n}\n}";
  
  return jsonData;
}