#include "WiFiConnection.h"

WiFiConnection::WiFiConnection(const char* ssid, const char* password)
: ssid(ssid), password(password) {}

void WiFiConnection::connect() {
  if(WiFi.status() == WL_CONNECTED)
    return;

  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);

  while(WiFi.begin(ssid, password) != WL_CONNECTED) {
    Serial.println("Failed to connect to WiFi. Retrying in 5 seconds...");
    delay(5000);
  }

  Serial.println("WiFi Connected!");
}

WiFiClient& WiFiConnection::getClient() {
  return wifiClient;
}
