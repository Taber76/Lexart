import dotenv from 'dotenv'
dotenv.config()

//export const DEPLOY_URL = process.env.DEPLOY_URL ? process.env.DEPLOY_URL : 'https://goevent-api.vercel.app/'

export const PORT = process.env.PORT
export const API_VERSION = process.env.API_VERSION
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10

export const SYNC_DB = process.env.SYNC_DB ? parseInt(process.env.SYNC_DB) : 0
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : ''
export const DEFAULT_SUBSCRIPTION_TYPE = process.env.DEFAULT_SUBSCRIPTION_TYPE ? process.env.DEFAULT_SUBSCRIPTION_TYPE : 'ef4342f3-95e3-46be-926c-4620a818077e'

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : 'GoEvent'
export const RESEND_API_KEY = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : 'GoEvent'
export const REMINDER_DAYS = process.env.REMINDER_DAYS ? parseInt(process.env.REMINDER_DAYS) : 3

export const CORS_ORIGIN = process.env.CORS_ORIGIN
export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'GoEvent'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
