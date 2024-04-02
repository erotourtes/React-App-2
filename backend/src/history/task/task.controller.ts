import { Controller, Get, Param, Query } from '@nestjs/common';
import { TaskHistoryService } from './tasks.service';

@Controller('history/tasks')
export class TaskHistoryController {
  constructor(private readonly historyService: TaskHistoryService) {}

  @Get()
  async findAll(@Query('boardId') boardId: number) {
    return this.historyService.findAll(boardId);
  }

  @Get(':taskId')
  async findEntityHistory(@Param('taskId') taskId: number) {
    return this.historyService.findEntityHistory(taskId);
  }
}
