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
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '@packages/types';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Get()
  findAll(@Query('listId') listId: number) {
    return this.tasksService.findAll(listId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }
}
