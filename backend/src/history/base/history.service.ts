import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { HistoryActionType, History } from '../history.entity';
import { HistoryT } from '@packages/types';
import { HistoryGateway } from '../task/task.gateway';

export class BaseHistoryService<T> {
  logger: Logger;
  constructor(
    private readonly historyRepository: Repository<History>,
    private readonly tableName: string,
    private readonly taskGateway: HistoryGateway,
  ) {
    this.logger = new Logger(`${BaseHistoryService.name}(${tableName})`);
  }

  async create(record: {
    actionType: HistoryActionType;
    fieldName?: keyof T;
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
      tableName: this.tableName,
    });

    const history = await this.historyRepository.save(newRecord);
    const historyT = await this.joinHistory(history.id);
    this.taskGateway.sendHistoryUpdate(historyT);

    this.logger.log({
      status: 'History record created',
      record,
    });
  }

  async findAll(boardId: number): Promise<History[]> {
    // TODO: raw sql in service!!
    return await this.historyRepository.query(
      `
SELECT h.*, t.name as name,
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."oldValue"::INTEGER)
          ELSE h."oldValue"
        END as "oldValue",
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."newValue"::INTEGER)
          ELSE h."newValue"
        END as "newValue"
FROM history h
JOIN task t 
  ON h."recordId" = t.id AND h."tableName" = 'task'
JOIN task_list tl
  ON tl."boardId" = $1 AND t."listId" = tl.id
ORDER BY h."timestamp" ASC
`,
      [boardId],
    );
  }

  async findEntityHistory(id: number): Promise<HistoryT[]> {
    // TODO: raw sql in service
    return await this.historyRepository.query(
      `
      SELECT h.*, t.name,
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."oldValue"::INTEGER)
          ELSE h."oldValue"
        END as "oldValue",
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."newValue"::INTEGER)
          ELSE h."newValue"
        END as "newValue"
      FROM history h
      JOIN ${this.tableName} t 
        ON h."recordId" = t.id
      WHERE h."recordId" = $1
      ORDER BY h."timestamp" ASC
    `,
      [id],
    );
  }

  private async joinHistory(historyId: number): Promise<HistoryT> {
    const record = await this.historyRepository.query(
      `
      SELECT h.*, t.name,
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."oldValue"::INTEGER)
          ELSE h."oldValue"
        END as "oldValue",
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."newValue"::INTEGER)
          ELSE h."newValue"
        END as "newValue"
      FROM history h
      JOIN ${this.tableName} t 
        ON h."recordId" = t.id
      WHERE h.id = $1
      LIMIT 1;
    `,
      [historyId],
    );
    return record[0];
  }
}

export abstract class BaseHistoryServiceTemplate<T> {
  abstract historyService: BaseHistoryService<T>;
  async create(record: {
    actionType: HistoryActionType;
    fieldName?: keyof T;
    oldValue?: string;
    newValue?: string;
    recordId: number;
    boardId: number;
  }) {
    await this.historyService.create(record);
  }

  async findAll(boardId: number): Promise<History[]> {
    return this.historyService.findAll(boardId);
  }

  async findEntityHistory(id: number): Promise<HistoryT[]> {
    return this.historyService.findEntityHistory(id);
  }
}
