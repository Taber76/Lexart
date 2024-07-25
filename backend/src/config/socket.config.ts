import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import ProductService from '../services/product.service';

class SocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket>;

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map()

    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = this.generateUniqueId();
      this.clients.set(clientId, ws);
      console.log('New client connected');

      ws.on('message', (message: string) => {
        const data = JSON.parse(message);

        if (data.type === 'createProducts') {
          ProductService.createMany(clientId);
        }

        if (data.type === 'deleteAllProducts') {
          ProductService.deleteAll(clientId);
        }
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`Client disconnected with ID: ${clientId}`);
      });
    });
  }

  private generateUniqueId(): string {
    return 'client-' + Math.random().toString(36).substr(2, 9);
  }

  public sendMessageToClient(clientId: string, data: any) {
    const client = this.clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }

}

export default SocketServer;
