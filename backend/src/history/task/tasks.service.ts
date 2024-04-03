import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HistoryActionType, History } from '../history.entity';
import { TaskHistoryGateway } from './task.gateway';
import { HistoryServerT } from '@packages/types';

@Injectable()
export class TaskHistoryService {
  logger: Logger;
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    private readonly taskGateway: TaskHistoryGateway,
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
    boardId?: number;
  }) {
    const newRecord = this.historyRepository.create({
      ...record,
      oldValue: record.oldValue?.substring(0, 128),
      newValue: record.newValue?.substring(0, 128),
      fieldName: record.fieldName as string,
    });

    const history = await this.historyRepository.save(newRecord);
    this.taskGateway.sendHistoryUpdate({
      ...history,
      task: { name: record.taskName },
    });

    this.logger.log({
      status: 'History record created',
      record,
    });
  }

  async findAll(boardId: number): Promise<HistoryServerT[]> {
    const histories = await this.historyRepository.find({
      select: {
        task: {
          name: true,
        },
      },
      where: { boardId },
      relations: { task: true },
    });

    return histories;
  }

  async findEntityHistory(id: number): Promise<History[]> {
    const record = await this.historyRepository.find({
      select: {
        task: {
          name: true,
        },
      },
      where: { recordId: id },
      relations: { task: true },
    });

    return record;
  }
}
