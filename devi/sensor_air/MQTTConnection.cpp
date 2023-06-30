#include "MQTTConnection.h"

MQTTConnection::MQTTConnection(WiFiClient& wifiClient, const char* broker, int port) 
: wifiClient(wifiClient), broker(broker), port(port), mqttClient(wifiClient) {}


void MQTTConnection::connect() {
  if(mqttClient.connected())
    return;

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  while(!mqttClient.connect(broker, port)) {
    Serial.println("Failed to connect to MQTT broker. Retrying in 5 seconds...");
    delay(5000);
  }

  Serial.println("MQTT Connected!");
}

MqttClient& MQTTConnection::getClient() {
  return mqttClient;
}
