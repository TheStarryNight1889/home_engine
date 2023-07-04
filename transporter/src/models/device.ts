import { DataTypes, Model, Sequelize } from 'sequelize';

class Device extends Model {}

const defineDeviceModel = (sequelize: Sequelize) => {
  Device.init(
    {
      device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      device_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_version: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
      sequelize,
      modelName: 'Device',
      tableName: 'device',
      timestamps: true,
    }
  );
};

export { Device, defineDeviceModel };
