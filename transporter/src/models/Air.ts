import { DataTypes, Model, Sequelize } from 'sequelize';

class Air extends Model {}

const defineAirModel = (sequelize: Sequelize) => {
  Air.init(
    {
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      co2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Air',
      tableName: 'air',
      timestamps: false,
    }
  );
};

export { Air, defineAirModel };
