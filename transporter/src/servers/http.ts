import express from 'express';
import { APP_PORT } from '../config';

class Http {
  private app: express.Application;
  private port: number;

  constructor(routes: any[]) {
    this.app = express();
    this.port = APP_PORT;
    this.app.use(express.json());
    this.app.use(routes);
  }

  public start() {
    this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
        }
    );
  }
}

export { Http };