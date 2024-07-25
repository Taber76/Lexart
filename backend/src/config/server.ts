import express from 'express';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { swaggerConfig } from './swagger.config';
import { PORT, API_VERSION, CORS_ORIGIN, SYNC_DB } from './environment';
import { errorHandler } from '../middlewares/error.middleware';
import PostgreDB from './db';
import authRoutes from '../routes/auth.routes';
import productRoutes from '../routes/product.routes';


export default class Server {
  public app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.errorHandler();
    this.setupSwagger();
    this.listen();
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
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  public close() {
    this.server.close();
  }
}
