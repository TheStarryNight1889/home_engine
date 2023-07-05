import { Sequelize} from 'sequelize';
import { Models } from '../models/';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

class DB {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize= new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            port: DB_PORT,
            dialect: 'postgres',
            logging: false,
          });
    }

    public async start(): Promise<void> {
        try {
            await this.connect();
            console.log('Database connection established');
        }
        catch (err) {
            console.log('Unable to connect to the database:', err);
        }
    }
    private async connect(): Promise<void>{
        await Models.build(this.sequelize);
        await this.sequelize.authenticate()
        await this.sequelize.sync();
    }
}

export { DB };