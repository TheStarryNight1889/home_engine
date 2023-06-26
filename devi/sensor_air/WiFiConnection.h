#ifndef WIFI_CONNECTION_H
#define WIFI_CONNECTION_H

#include <WiFiNINA.h>

class WiFiConnection {
  public:
    WiFiConnection(const char* ssid, const char* password);
    void connect();
    WiFiClient& getClient();

  private:
    const char* ssid;
    const char* password;
    WiFiClient wifiClient;
};

#endif