#include "Logger.h"
class ClientAbstract
{
protected:
    Logger logger;

public:
    virtual void Connect() = 0;
    virtual void Disconnect() = 0;
}