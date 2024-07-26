"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_config_1 = require("./sequelize.config");
class PostgreDB {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!PostgreDB.instance) {
                PostgreDB.instance = new PostgreDB();
                yield PostgreDB.instance.connect();
            }
            return PostgreDB.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_config_1.sequelize.authenticate();
                console.log('Conected to PostgreSQL with Sequelize');
            }
            catch (err) {
                console.error('Unable to connect to the database:', err);
                throw err;
            }
        });
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_config_1.sequelize.sync();
            }
            catch (err) {
                console.error('Unable to sync the database:', err);
                throw err;
            }
        });
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_config_1.sequelize.authenticate();
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_config_1.sequelize.close();
                PostgreDB.instance = null;
                console.log('Connection to PostgreSQL closed');
            }
            catch (err) {
                console.error('Error closing the connection:', err);
                throw err;
            }
        });
    }
}
PostgreDB.instance = null;
exports.default = PostgreDB;
