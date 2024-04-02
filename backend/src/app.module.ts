import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/tasks.module';
import { TaskListModule } from './task-lists/task-lists.module';
import { Task } from './tasks/tasks.entity';
import { TaskList } from './task-lists/task-lists.entity';
import { AppLoggerMiddleware } from './middlewares/AppLoggerMiddleware';
import { History } from './history/history.entity';
import { HistoryModule } from './history/history.module';
import { envConfig } from './config/env.config';
import { BoardModule } from './board/board.module';
import { Board } from './board/board.entity';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRoot({
      ...databaseConfig(),
      entities: [Task, TaskList, History, Board],
    }),
    TaskModule,
    TaskListModule,
    ConfigModule,
    HistoryModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
