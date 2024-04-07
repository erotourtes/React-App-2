import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HistoryActionType, History } from '../history.entity';
import { TaskHistoryGateway } from './task.gateway';
import { HistoryT } from '@packages/types';
import { TaskList } from 'src/task-lists/task-lists.entity';

@Injectable()
export class TaskHistoryService {
  logger: Logger;
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    private readonly taskGateway: TaskHistoryGateway,
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {
    this.logger = new Logger(`${TaskHistoryGateway.name}`);
  }

  async create(record: {
    actionType: HistoryActionType;
    taskName: string;
    fieldName?: keyof Task;
    oldValue?: string;
    newValue?: string;
    recordId: number;
    boardId: number;
  }) {
    const newRecord = this.historyRepository.create({
      ...record,
      oldValue: record.oldValue?.substring(0, 128),
      newValue: record.newValue?.substring(0, 128),
      fieldName: record.fieldName as string,
    });

    const history = await this.historyRepository.save(newRecord).catch((e) => {
      this.logger.error({
        status: 'History record creation failed',
        record,
        error: e,
      });
      return null;
    });

    // Mutates the history object
    if (record.fieldName === 'list') await this.joinSingleListName(history);

    this.taskGateway.sendHistoryUpdate({
      ...history,
      task: { name: record.taskName },
    });

    this.logger.log({
      status: 'History record created',
      record,
    });
  }

  async findAll(boardId: number): Promise<History[]> {
    const histories = await this.historyRepository.find({
      select: { task: { name: true } },
      where: { boardId },
      relations: { task: true },
      order: { timestamp: 'ASC' },
    });

    // Mutates the histories array
    await this.joinListNameFor(histories);

    return histories;
  }

  async findEntityHistory(id: number): Promise<History[]> {
    const histories = await this.historyRepository.find({
      select: { task: { name: true } },
      where: { recordId: id },
      relations: { task: true },
      order: { timestamp: 'ASC' },
    });

    await this.joinListNameFor(histories);

    return histories;
  }

  /*
   * Mutates the histories array
   */
  private async joinListNameFor(histories: History[]) {
    const promises = histories
      .filter((h) => h.fieldName === 'list')
      .map(this.joinSingleListName.bind(this));
    await Promise.all(promises);
  }

  private async joinSingleListName(history: HistoryT) {
    if (history.fieldName !== 'list') return;

    const oldList = await this.taskListRepository.findOne({
      select: { name: true },
      where: { id: +history.oldValue },
    });

    const newList = await this.taskListRepository.findOne({
      select: { name: true },
      where: { id: +history.newValue },
    });

    history.data = {
      oldListName: oldList?.name,
      newListName: newList?.name,
    };
  }
}
