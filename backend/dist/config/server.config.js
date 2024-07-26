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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
const socket_config_1 = __importDefault(require("./socket.config"));
const swagger_config_1 = require("./swagger.config");
const environment_1 = require("./environment");
const error_middleware_1 = require("../middlewares/error.middleware");
const db_config_1 = __importDefault(require("./db.config"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const product_routes_1 = __importDefault(require("../routes/product.routes"));
class Server {
    constructor() {
        this.socketServer = null;
        this.app = (0, express_1.default)();
        this.database();
        this.middlewares();
        this.routes();
        this.errorHandler();
        this.setupSwagger();
        this.listen();
        this.setupWebSocket();
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield db_config_1.default.getInstance();
            if (environment_1.SYNC_DB === 1) {
                try {
                    yield db.sync();
                    console.log('Database synchronized successfully.');
                }
                catch (err) {
                    console.error('Unable to sync the database:', err);
                }
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: environment_1.CORS_ORIGIN }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(`/${environment_1.API_VERSION}/auth`, auth_routes_1.default);
        this.app.use(`/${environment_1.API_VERSION}/products`, product_routes_1.default);
    }
    errorHandler() {
        this.app.use(error_middleware_1.errorHandler);
    }
    setupSwagger() {
        (0, express_jsdoc_swagger_1.default)(this.app)(swagger_config_1.swaggerConfig);
    }
    listen() {
        this.server = http_1.default.createServer(this.app);
        this.server.listen(environment_1.PORT, () => {
            console.log(`Server running on port ${environment_1.PORT}`);
        });
    }
    setupWebSocket() {
        this.socketServer = new socket_config_1.default(this.server);
    }
    close() {
        this.server.close();
    }
}
exports.default = Server;
