import { DataTypes, Model, Sequelize } from 'sequelize';

class DeviceConnection extends Model {}

const defineDeviceConnectionModel = (sequelize: Sequelize) => {
  DeviceConnection.init(
    {
      device_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DeviceConnection',
      tableName: 'device_connection',
      timestamps: true,
    }
  );
};

export { DeviceConnection, defineDeviceConnectionModel };
