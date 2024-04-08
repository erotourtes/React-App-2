import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.entity';
import { TaskHistoryCreatorService } from './tasks.service';
import { HistoryActionType } from '../history.entity';
import { EventEmitter } from 'stream';

type EventT = 'insert' | 'update' | 'remove';

@Injectable()
@EventSubscriber()
export class TaskHistoryDbSubscriber implements EntitySubscriberInterface {
  private ee = new EventEmitter();

  constructor(
    private readonly historyService: TaskHistoryCreatorService,
    @InjectDataSource() readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  /*
   * This method is called after the entity is inserted.
   * The event.entity property contains the entity that was passed to the repository.save(<entity>).
   * This function can't be async because it's called from the TypeORM event loop.
   */
  afterInsert(event: InsertEvent<Task>) {
    this.historyService
      .create(
        {
          actionType: HistoryActionType.CREATE,
          taskName: event.entity.name,
          recordId: event.entity.id,
          boardId: event.entity.list.boardId,
        },
        event.manager,
      )
      .then(() => {
        this.emit('insert', event);
      });
  }

  afterUpdate(event: UpdateEvent<Task>) {
    const newTask = event.entity as Task;
    const promises = [];
    if (newTask.isDeleted) return void this.handleRemove(event);

    const isListChanged = newTask.list.id !== event.databaseEntity.list.id;
    if (isListChanged) {
      const promise = this.historyService.create(
        {
          actionType: HistoryActionType.UPDATE,
          taskName: newTask.name,
          fieldName: 'list',
          oldValue: event.databaseEntity.list.id.toString(),
          newValue: newTask.list.id.toString(),
          recordId: event.entity.id,
          boardId: newTask.list.boardId,
        },
        event.manager,
      );
      promises.push(promise);
    }

    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      const promise = this.historyService.create(
        {
          actionType: HistoryActionType.UPDATE,
          taskName: newTask.name,
          fieldName: <keyof Task>value.databaseName,
          oldValue: event.databaseEntity[value.databaseName],
          newValue: newTask[value.databaseName],
          recordId: event.entity.id,
          boardId: newTask.list.boardId,
        },
        event.manager,
      );
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      this.emit('update', event);
    });
  }

  handleRemove(event: UpdateEvent<Task>) {
    const entity = event.entity;
    this.historyService
      .create(
        {
          actionType: HistoryActionType.DELETE,
          taskName: entity.name,
          recordId: entity.id,
          boardId: entity.list.boardId,
        },
        event.manager,
      )
      .then(() => {
        this.emit('remove', entity);
      });
  }

  on<T extends EventT>(event: T, listener: (event: T) => void) {
    this.ee.on(event, listener);
  }

  private emit<T extends EventT>(event: T, data: any) {
    this.ee.emit(event, data);
  }
}
