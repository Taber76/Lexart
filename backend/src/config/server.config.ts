import express from 'express';
import cors from 'cors';
import http from 'http';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import SocketServer from './socket.config';
import { swaggerConfig } from './swagger.config';
import { PORT, API_VERSION, CORS_ORIGIN, SYNC_DB } from './environment';
import { errorHandler } from '../middlewares/error.middleware';
import PostgreDB from './db.config';
import authRoutes from '../routes/auth.routes';
import productRoutes from '../routes/product.routes';


export default class Server {
  public app: express.Application;
  private server: any;
  public socketServer: SocketServer | null = null;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.errorHandler();
    this.setupSwagger();
    this.listen();
    this.setupWebSocket();
  }

  private async database() {
    const db = await PostgreDB.getInstance();
    if (SYNC_DB === 1) {
      try {
        await db.sync();
        console.log('Database synchronized successfully.');
      } catch (err) {
        console.error('Unable to sync the database:', err);
      }
    }
  }

  private middlewares() {
    this.app.use(cors({ origin: CORS_ORIGIN }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(`/${API_VERSION}/auth`, authRoutes);
    this.app.use(`/${API_VERSION}/products`, productRoutes);
  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  private setupSwagger() {
    expressJSDocSwagger(this.app)(swaggerConfig);
  }

  private listen() {
    this.server = http.createServer(this.app);
    this.server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  private setupWebSocket() {
    this.socketServer = new SocketServer(this.server);
  }

  public close() {
    this.server.close();
  }
}
