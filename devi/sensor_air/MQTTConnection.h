#ifndef MQTT_CONNECTION_H
#define MQTT_CONNECTION_H

#include <WiFiNINA.h>
#include <ArduinoMqttClient.h>

class MQTTConnection {
  public:
    MQTTConnection(WiFiClient& wifiClient, const char* broker, int port);
    MqttClient& getClient();
    void connect();
    void poll();

  private:
    const char* broker;
    int port;
    WiFiClient& wifiClient;
    MqttClient mqttClient;
};

#endif