import express from 'express'
import cors from 'cors'
import { ControllerInterface } from '../controllers/controllerInterface'
import { auth } from 'express-oauth2-jwt-bearer'

class Http {
    private app: express.Application
    private port: number
    private controllers: any
    private jwtCheck = auth({
        audience: 'https://app.saer/api',
        issuerBaseURL: 'https://dev-0jg8oa0k66amlc87.eu.auth0.com/',
        tokenSigningAlg: 'RS256',
    })

    constructor(controllers: ControllerInterface[]) {
        this.app = express()
        this.port = Number(Bun.env.APP_PORT)
        this.controllers = controllers
    }
    private setMiddlewares() {
        this.app.use(express.json())
        this.app.use(
            cors({
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'X-Requested-With',
                    'Accept',
                    'Origin',
                ],
            })
        )
        this.app.options('*', cors())
        this.controllers.forEach((controller: ControllerInterface) => controller.routes(this.app));
    }

    public start() {
      console.log('Starting HTTP server')
        this.setMiddlewares()
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

export { Http }
