import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { TaskListModule } from 'src/task-lists/task-lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskListModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TaskModule {}
