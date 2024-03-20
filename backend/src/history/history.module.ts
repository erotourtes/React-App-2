import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { TaskHistoryDbSubscriber } from './task/tasks.dbsubscriber';
import { TaskHistoryService } from './task/tasks.service';
import { TaskHistoryController } from './task/task.controller';
import { TaskHistoryGateway } from './task/task.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [TaskHistoryService, TaskHistoryDbSubscriber, TaskHistoryGateway],
  controllers: [TaskHistoryController],
  exports: [],
})
export class HistoryModule {}
