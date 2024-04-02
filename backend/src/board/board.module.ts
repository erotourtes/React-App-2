import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { TaskListModule } from 'src/task-lists/task-lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TaskListModule],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
