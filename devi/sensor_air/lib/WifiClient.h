#include "ClientAbstract.h"

class WifiClient : public ClientAbstract
{
public:
    void Connect()
    {
        logger.Info("Connecting to Wifi");
        while (WiFi.begin(ssid, pass) != WL_CONNECTED)
        {
            logger.Info("Failed to connect to Wifi");
            delay(5000);
        }
        logger.Info("WIFI Connected");
    }
    void Disconnect()
    {
        logger.Info("Disconnecting from Wifi");
        WiFi.disconnect();
        logger.Info("WIFI Disconnected");
    }
}