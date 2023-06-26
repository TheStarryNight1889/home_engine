#include "MQTTPublisher.h"

MQTTPublisher::MQTTPublisher(MqttClient& mqttClient)
: mqttClient(mqttClient) {}

void MQTTPublisher::publish(const char* topic, const char* message) {
  mqttClient.beginMessage(topic);
  mqttClient.print(message);
  mqttClient.endMessage();
}