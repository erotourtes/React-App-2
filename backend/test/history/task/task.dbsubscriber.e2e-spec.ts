import { WsAdapter } from '@nestjs/platform-ws';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Board } from 'src/board/board.entity';
import { TaskPriority } from '@packages/types';
import { TaskHistoryDbSubscriber } from 'src/history/task/tasks.dbsubscriber';

describe('Automatic History Creation', () => {
  test.concurrent(
    'should create history insert record',
    async () => {
      const ctx = new TestContext();
      await ctx.setup();

      const { body: board } = await request(ctx.httpServer)
        .post(`/board`)
        .send({
          name: 'Board 1',
        });
      const { body: list } = await request(ctx.httpServer)
        .post(`/task-lists`)
        .send({
          name: 'Task List 1',
          boardId: board.id,
        });
      const { body: task } = await request(ctx.httpServer).post(`/tasks`).send({
        name: 'Task 1',
        description: 'Description 1',
        priority: TaskPriority.MEDIUM,
        listId: list.id,
      });

      await new Promise((resolve) =>
        ctx.dbSubscriber.on('insert', (event) => resolve(event)),
      );

      const response = await request(ctx.httpServer).get(
        `/history/tasks/${task.id}`,
      );
      const history = response.body;

      expect(response.status).toBe(200);
      expect(history.length).toBe(1);
      expect(history[0]).toMatchObject({
        recordId: task.id,
      });

      await ctx.tearDown();
    },
    10_000,
  );
});

class TestContext {
  app: INestApplication<any>;
  dbSource: DataSource;
  dbSubscriber: TaskHistoryDbSubscriber;

  async setup() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.useWebSocketAdapter(new WsAdapter(this.app));
    await this.app.init();

    this.dbSource = moduleRef.get<DataSource>(DataSource);
    this.dbSubscriber = moduleRef.get<TaskHistoryDbSubscriber>(
      TaskHistoryDbSubscriber,
    );
  }

  async tearDown() {
    await this.dbSource.manager.delete(Board, {});
    await this.app.close();
  }

  get httpServer() {
    return this.app.getHttpServer();
  }
}
