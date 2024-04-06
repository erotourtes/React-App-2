import { WsAdapter } from '@nestjs/platform-ws';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { TaskPriority } from '@packages/types';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Board } from 'src/board/board.entity';
import { TaskHistoryDbSubscriber } from 'src/history/task/tasks.dbsubscriber';
import { createTasks } from 'test/stabs/stabs';

describe('TaskController', () => {
  let app: INestApplication<any>;
  let dbSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TaskHistoryDbSubscriber)
      .useValue({
        listenTo: jest.fn(),
        afterInsert: jest.fn(),
        afterUpdate: jest.fn(),
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.init();

    dbSource = moduleRef.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dbSource.manager.delete(Board, {});
    await app.close();
  });

  it('should return tasks', async () => {
    const { lists } = await createTasks(dbSource);

    const response = await request(app.getHttpServer()).get(
      `/tasks?listId=${lists[0].id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        isDeleted: false,
        name: 'Task 1',
        description: 'Description 1',
        priority: TaskPriority.LOW,
        dueDate: '2014-02-18',
        list: { id: lists[0].id },
      },
      {
        id: expect.any(Number),
        isDeleted: false,
        name: 'Task 2',
        description: 'Description 2',
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        list: { id: lists[0].id },
      },
    ]);
  });

  it('should not return deleted tasks', async () => {
    const { lists, tasks0 } = await createTasks(dbSource);

    const response = await request(app.getHttpServer()).delete(
      `/tasks/${tasks0[0].id}`,
    );
    const tasks = await request(app.getHttpServer()).get(
      `/tasks?listId=${lists[0].id}`,
    );

    expect(response.status).toBe(200);
    expect(tasks.body).toEqual([
      {
        id: expect.any(Number),
        isDeleted: false,
        name: 'Task 2',
        description: 'Description 2',
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        list: { id: lists[0].id },
      },
    ]);
  });

  it('should not return deleted task', async () => {
    const { tasks0 } = await createTasks(dbSource);

    const response = await request(app.getHttpServer()).delete(
      `/tasks/${tasks0[0].id}`,
    );
    const task = await request(app.getHttpServer()).get(
      `/tasks/${tasks0[0].id}`,
    );

    expect(response.status).toBe(404);
    expect(task.body).toBeNull();
  });
});
