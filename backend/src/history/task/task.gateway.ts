import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { HistoryT } from '@packages/types';
import * as ws from 'ws';

export interface HistoryGateway {
  sendHistoryUpdate(history: HistoryT): void;
}

@WebSocketGateway({ path: '/ws', cors: true })
export class TaskHistoryGateway implements HistoryGateway {
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
