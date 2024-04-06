import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import {
  CreateTaskDto,
  TaskListT,
  TaskT,
  UpdateTaskDto,
} from '@packages/types';
import { TaskListsService } from 'src/task-lists/task-lists.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private listService: TaskListsService,
  ) {}

  async findAll(listId?: number): Promise<TaskT[]> {
    const tasks = await this.taskRepository.find({
      select: { list: { id: true } },
      where: { isDeleted: false, list: { id: listId } },
      relations: { list: true },
    });

    return tasks;
  }

  async findAllIdOnly(listId: number): Promise<{ id: number }[]> {
    return await this.taskRepository.find({
      select: ['id'],
      where: { list: { id: listId }, isDeleted: false },
    });
  }

  async findOne(id: number): Promise<TaskT> {
    const task = await this.taskRepository.findOne({
      select: { list: { id: true } },
      where: { id, isDeleted: false },
      relations: { list: true },
    });

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return task;
  }

  async create(dto: CreateTaskDto): Promise<TaskT> {
    const list = await this.listService.findOne(dto.listId);
    if (!list)
      throw new NotFoundException(`List with id ${dto.listId} not found`);

    const newTask = this.taskRepository.create({ ...dto, list: list });
    return await this.taskRepository.save(newTask).catch((e) => {
      this.logger.error(e);
      throw new BadRequestException('Task creation failed');
    });
  }

  async update(taskId: number, task: UpdateTaskDto): Promise<TaskT> {
    const foundTask = await this.taskRepository.findOne({
      where: { id: taskId, isDeleted: false },
    });
    if (!foundTask)
      throw new NotFoundException(`Task with id ${taskId} not found`);

    let list: TaskListT;
    if (task.listId) {
      list = await this.listService.findOne(task.listId);
      if (!list)
        throw new NotFoundException(`List with id ${task.listId} not found`);
    }

    return this.taskRepository.save({
      ...foundTask,
      ...task,
      list: task.listId ? list : foundTask.list,
    });
  }

  async delete(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({
      select: {
        id: true,
        list: { id: true, boardId: true },
      },
      where: { id },
      relations: { list: true },
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    task.isDeleted = true;
    await this.taskRepository.save(task);
  }
}
