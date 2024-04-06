import { Task } from 'src/tasks/tasks.entity';
import { TaskPriority } from '@packages/types';
import { DataSource } from 'typeorm';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { Board } from 'src/board/board.entity';

export const boardStab = (): Partial<Board>[] => [{ name: 'Board 1' }];
export const listStab = (): Partial<TaskList>[] => [
  { name: 'Task List 1' },
  { name: 'Task List 2' },
];

export const taskStab = (): Partial<Task>[] => [
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

export const createTasks = async (dbSource: DataSource) => {
  const boards = await dbSource.manager.save(Board, boardStab());
  const lists = await dbSource.manager.save(
    TaskList,
    listStab().map((taskList) => ({ ...taskList, board: boards[0] })),
  );
  const tasks0 = await dbSource.manager.save(
    Task,
    taskStab().map((task) => ({ ...task, list: lists[0] })),
  );
  const tasks1 = await dbSource.manager.save(
    Task,
    taskStab().map((task) => ({ ...task, list: lists[1] })),
  );
  return {
    boards,
    lists,
    tasks0,
    tasks1,
  };
};
