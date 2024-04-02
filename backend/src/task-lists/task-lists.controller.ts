import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto, UpdateTaskListDto } from '@packages/types';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Get()
  async findAll(@Query('boardId') boardId: number) {
    return this.taskListsService.findAll(boardId);
  }

  @Post()
  async create(@Body() dto: CreateTaskListDto) {
    return this.taskListsService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskListsService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskListDto,
  ) {
    return this.taskListsService.update(id, dto);
  }
}
