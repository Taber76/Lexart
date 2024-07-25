import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const API_VERSION = process.env.API_VERSION
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10

export const SYNC_DB = process.env.SYNC_DB ? parseInt(process.env.SYNC_DB) : 0
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : ''

export const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : '*'
export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
