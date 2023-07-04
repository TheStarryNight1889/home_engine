import express from 'express';
import { APP_PORT } from '../config';
import cors from 'cors';

class Http {
  private app: express.Application;
  private port: number;
  private routes: any;

  constructor(routes: any[]) {
    this.app = express();
    this.port = APP_PORT;
    this.routes = routes;
  }
  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.routes);
  }

  public start() {
    this.setMiddlewares();
    this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
        }
    );
  }
}

export { Http };