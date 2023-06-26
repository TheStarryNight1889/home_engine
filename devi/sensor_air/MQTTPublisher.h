#ifndef MQTT_PUBLISHER_H
#define MQTT_PUBLISHER_H

#include <ArduinoMqttClient.h>

class MQTTPublisher {
  public:
    MQTTPublisher(MqttClient& mqttClient);
    void publish(const char* topic, const char* message);

  private:
    MqttClient& mqttClient;
};

#endif