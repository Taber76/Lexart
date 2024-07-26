import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import ProductService from '../services/product.service';
import AuthHelper from '../helpers/auth.helper';

class SocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket>;

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map();

    this.wss.on('connection', (ws: WebSocket) => {
      let userId: string | undefined;

      ws.on('message', (message: string) => {
        const data = JSON.parse(message);

        if (!userId) {
          if (data.type === 'authenticate') {
            const token = data.token;
            userId = this.getUserIdFromToken(token);
            if (userId) {
              this.clients.set(userId, ws);
              this.sendMessageToClient(userId, { type: 'authenticated' });
              console.log(`Client authenticated with user ID: ${userId}`);
            } else {
              ws.close(1008, 'Invalid token');
              console.log(`Client failed authentication with token: ${token}`);
            }
          } else {
            ws.close(1008, 'Authentication required');
            console.log('Client attempted to send message without authentication');
          }
          return;
        }

        if (data.type === 'createProducts') {
          ProductService.createMany(userId);
        }

        if (data.type === 'deleteAllProducts') {
          ProductService.deleteAll(userId);
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

  private getUserIdFromToken(token: string): string | undefined {
    const decodedToken = AuthHelper.decodeToken(token);
    if (!decodedToken) return undefined;
    return decodedToken.id;
  }

  public sendMessageToClient(userId: string, data: any) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

export default SocketServer;

