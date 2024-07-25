import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

class SocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket>;

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map();

    this.wss.on('connection', (ws: WebSocket, req) => {
      const userId = req.url?.split('=')[1];

      if (userId) {
        this.clients.set(userId, ws);
        console.log(`New client connected: ${userId}`);

        ws.on('message', (message: string) => {
          console.log(`Received message from ${userId}: ${message}`);
        });

        ws.on('close', () => {
          this.clients.delete(userId);
          console.log(`Client disconnected: ${userId}`);
        });
      } else {
        ws.close();
        console.log('Client connection closed due to missing userId');
      }
    });
  }

  public sendMessageToClient(userId: string, data: any) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

export default SocketServer;
