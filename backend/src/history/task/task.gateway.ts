import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { HistoryT } from '@packages/types';
import * as ws from 'ws';

@WebSocketGateway({ path: '/ws', cors: true })
export class TaskHistoryGateway {
  constructor() {}

  @WebSocketServer()
  server: ws.Server;

  sendHistoryUpdate(task: HistoryT) {
    this.server.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          event: 'history:task:new',
          data: task,
        }),
      );
    });
  }
}
