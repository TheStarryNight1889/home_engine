import express from 'express'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer'

class Http {
    private app: express.Application
    private port: number
    private routes: any
    private jwtCheck = auth({
        audience: 'https://app.saer/api',
        issuerBaseURL: 'https://dev-0jg8oa0k66amlc87.eu.auth0.com/',
        tokenSigningAlg: 'RS256',
    })

    constructor(routes: any[]) {
        this.app = express()
        this.port = Number(Bun.env.APP_PORT)
        this.routes = routes
    }
    private setMiddlewares() {
        this.app.use((req, res, next) => {
            if (req.method === 'OPTIONS') {
                return next() // Allow the pre-flight OPTIONS request
            }
            this.jwtCheck(req, res, next)
        })
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
        this.app.use(this.routes)
    }

    public start() {
        this.setMiddlewares()
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

export { Http }
