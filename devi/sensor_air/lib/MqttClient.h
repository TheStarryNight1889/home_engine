#include "ClientAbstract.h"

class MqttClient : public ClientAbstract
{
public:
    void Connect()
    {
        logger.Info("Connecting to MQTT broker");
        if (!mqttClient.connect(broker, port))
        {
            logger.Error("MQTT connection failed! Error code = " + String(mqttClient.connectError()));
        }
        logger.Info("MQTT Connected");
    }
    void Disconnect()
    {
        logger.Info("Disconnecting from MQTT broker");
        mqttClient.disconnect();
        logger.Info("MQTT Disconnected");
    }
}