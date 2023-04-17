import { defineAirModel } from "./air";
import { Sequelize} from 'sequelize';

class Models {
  static build(sequelize: Sequelize) {
    defineAirModel(sequelize);
  }
}

export { Models };