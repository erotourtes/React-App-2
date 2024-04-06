import { WsAdapter } from '@nestjs/platform-ws';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Task } from 'src/tasks/tasks.entity';
import { TaskPriority } from '@packages/types';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { Board } from 'src/board/board.entity';
import { TaskHistoryDbSubscriber } from 'src/history/task/tasks.dbsubscriber';

const boardStab = (): Partial<Board>[] => [{ name: 'Board 1' }];
const listStab = (): Partial<TaskList>[] => [{ name: 'Task List 1' }];

const taskStab = (): Partial<Task>[] => [
  {
    name: 'Task 1',
    description: 'Description 1',
    priority: TaskPriority.LOW,
    dueDate: new Date('2014-02-18').toISOString(),
  },
  {
    name: 'Task 2',
    description: 'Description 2',
    priority: TaskPriority.MEDIUM,
  },
];

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
    const boards = await dbSource.manager.save(Board, boardStab());
    const lists = await dbSource.manager.save(
      TaskList,
      listStab().map((taskList) => ({ ...taskList, board: boards[0] })),
    );
    await dbSource.manager.save(
      Task,
      taskStab().map((task) => ({ ...task, list: lists[0] })),
    );

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
});
