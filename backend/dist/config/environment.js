"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.CORS_ORIGIN = exports.DB_URL = exports.SYNC_DB = exports.SALT_ROUNDS = exports.API_VERSION = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.API_VERSION = process.env.API_VERSION;
exports.SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
exports.SYNC_DB = process.env.SYNC_DB ? parseInt(process.env.SYNC_DB) : 0;
exports.DB_URL = process.env.DB_URL ? process.env.DB_URL : '';
exports.CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : '*';
exports.JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
