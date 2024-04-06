import { WsAdapter } from '@nestjs/platform-ws';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Board } from 'src/board/board.entity';
import { TaskPriority } from '@packages/types';
import { TaskHistoryDbSubscriber } from 'src/history/task/tasks.dbsubscriber';

describe('TaskHistoryDbSubscriber', () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = new TestContext();
    await ctx.setup();
  });

  afterEach(async () => {
    await ctx.tearDown();
  });

  it('should create history insert record', async () => {
    const task = await ctx.createTask();
    await new Promise((resolve) => ctx.dbSubscriber.on('insert', resolve));

    const response = await ctx.response.get(`/history/tasks/${task.id}`);
    const history = response.body;

    expect(response.status).toBe(200);
    expect(history.length).toBe(1);
    expect(history[0]).toMatchObject({
      recordId: task.id,
    });
  });

  it('should create history update records', async () => {
    const task = await ctx.createTask();

    await ctx.response.patch(`/tasks/${task.id}`).send({
      name: 'Updated',
      priority: TaskPriority.HIGH,
    });

    await new Promise((resolve) => ctx.dbSubscriber.on('update', resolve));

    const response = await ctx.response.get(`/history/tasks/${task.id}`);
    const history = response.body;

    expect(response.status).toBe(200);
    expect(history.length).toBe(3);

    const nameUpdate = history.find((h) => h.fieldName === 'name');
    expect(nameUpdate).toMatchObject({
      recordId: task.id,
      actionType: 'update',
      oldValue: 'Task 1',
      newValue: 'Updated',
    });

    const priorityUpdate = history.find((h) => h.fieldName === 'priority');
    expect(priorityUpdate).toMatchObject({
      recordId: task.id,
      actionType: 'update',
      oldValue: TaskPriority.MEDIUM,
      newValue: TaskPriority.HIGH,
    });
  });

  it('should create delete history record when task is deleted', async () => {
    const task = await ctx.createTask();
    await new Promise((resolve) => ctx.dbSubscriber.on('insert', resolve));

    await ctx.response.delete(`/tasks/${task.id}`);
    await new Promise((resolve) => ctx.dbSubscriber.on('remove', resolve));

    const response = await ctx.response.get(`/history/tasks/${task.id}`);
    const history = response.body;

    expect(response.status).toBe(200);
    expect(history.length).toBe(2);
    expect(history[1]).toMatchObject({ actionType: 'delete' });
  });
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

  async createTask() {
    const { body: board } = await this.response.post(`/board`).send({
      name: 'Board 1',
    });
    const { body: list } = await this.response.post(`/task-lists`).send({
      name: 'Task List 1',
      boardId: board.id,
    });
    const { body: task } = await this.response.post(`/tasks`).send({
      name: 'Task 1',
      description: 'Description 1',
      priority: TaskPriority.MEDIUM,
      listId: list.id,
    });

    return task;
  }

  async tearDown() {
    await this.dbSource.manager.delete(Board, {});
    await this.app.close();
  }

  get response() {
    return request(this.app.getHttpServer());
  }
}
