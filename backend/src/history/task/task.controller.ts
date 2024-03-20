import { Controller, Get, Param } from '@nestjs/common';
import { TaskHistoryService } from './tasks.service';

@Controller('history/tasks')
export class TaskHistoryController {
  constructor(private readonly historyService: TaskHistoryService) {}

  @Get()
  async findAll() {
    return this.historyService.findAll();
  }

  @Get(':taskId')
  async findEntityHistory(@Param('taskId') taskId: number) {
    return this.historyService.findEntityHistory(taskId);
  }
}
