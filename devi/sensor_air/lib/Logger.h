class Logger
{
public:
    void Error(const char *message)
    {
        Serial.println("Error: " + String(message));
    }
    void Info(const char *message)
    {
        Serial.println("Info: " + String(message));
    }
}