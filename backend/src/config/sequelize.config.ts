import { Sequelize } from 'sequelize';
import { DB_URL } from './environment';
import pg from 'pg';

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});