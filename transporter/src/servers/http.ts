import express from 'express';
import { APP_PORT } from '../config';
import WebSocket from 'ws';

class Http {
  private app: express.Application;
  private port: number;
  private routes: any;
  // private wss: WebSocket.Server;

  constructor(routes: any[]) {
    this.app = express();
    this.port = APP_PORT;
    this.routes = routes;
    // this.wss = wss;
  }

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(this.routes)
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