"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const product_service_1 = __importDefault(require("../services/product.service"));
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
class SocketServer {
    constructor(server) {
        this.wss = new ws_1.WebSocketServer({ server });
        this.clients = new Map();
        this.wss.on('connection', (ws) => {
            let userId;
            ws.on('message', (message) => {
                const data = JSON.parse(message);
                if (!userId) {
                    if (data.type === 'authenticate') {
                        const token = data.token;
                        userId = this.getUserIdFromToken(token);
                        if (userId) {
                            this.clients.set(userId, ws);
                            this.sendMessageToClient(userId, { type: 'authenticated' });
                            console.log(`Client authenticated with user ID: ${userId}`);
                        }
                        else {
                            ws.close(1008, 'Invalid token');
                            console.log(`Client failed authentication with token: ${token}`);
                        }
                    }
                    else {
                        ws.close(1008, 'Authentication required');
                        console.log('Client attempted to send message without authentication');
                    }
                    return;
                }
                if (data.type === 'createProducts') {
                    product_service_1.default.createMany(userId);
                }
                if (data.type === 'deleteAllProducts') {
                    product_service_1.default.deleteAll(userId);
                }
            });
            ws.on('close', () => {
                if (userId) {
                    this.clients.delete(userId);
                    console.log(`Client disconnected with user ID: ${userId}`);
                }
            });
        });
    }
    getUserIdFromToken(token) {
        const decodedToken = auth_helper_1.default.decodeToken(token);
        if (!decodedToken)
            return undefined;
        return decodedToken.id;
    }
    sendMessageToClient(userId, data) {
        const client = this.clients.get(userId);
        if (client && client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    }
}
exports.default = SocketServer;
