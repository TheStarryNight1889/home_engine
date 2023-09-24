import { defineAirModel } from './air'
import { defineDeviceModel } from './device'
import { defineDeviceConnectionModel } from './deviceConnection'
import { Sequelize } from 'sequelize'

class Models {
    static build(sequelize: Sequelize) {
        defineAirModel(sequelize)
        defineDeviceModel(sequelize)
        defineDeviceConnectionModel(sequelize)
    }
}

export { Models }
