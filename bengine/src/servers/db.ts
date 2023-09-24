import { Sequelize } from 'sequelize'
import { Models } from '../models/'

class DB {
    private sequelize: Sequelize

    private DB_NAME: string = Bun.env.DB_NAME || 'bengine'
    private DB_USER: string = Bun.env.DB_USER || 'bengine'
    private DB_PASSWORD: string = Bun.env.DB_PASSWORD || 'bengine'
    private DB_HOST: string = Bun.env.DB_HOST || 'localhost'
    private DB_PORT: number = Number(Bun.env.DB_PORT) || 5432

    constructor() {
        this.sequelize = new Sequelize(
            this.DB_NAME,
            this.DB_USER,
            this.DB_PASSWORD,
            {
                host: this.DB_HOST,
                port: this.DB_PORT,
                dialect: 'postgres',
                logging: false,
            }
        )
    }

    public async start(): Promise<void> {
        try {
            await this.connect()
            console.log('Database connection established')
        } catch (err) {
            console.log('Unable to connect to the database:', err)
        }
    }
    private async connect(): Promise<void> {
        await Models.build(this.sequelize)
        await this.sequelize.authenticate()
        await this.sequelize.sync()
    }
}

export { DB }
