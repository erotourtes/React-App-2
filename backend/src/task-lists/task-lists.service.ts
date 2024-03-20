import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskList } from './task-lists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTaskListDto,
  TaskListT,
  UpdateTaskListDto,
} from '@packages/types';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListsRepository: Repository<TaskList>,
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  async findAll(): Promise<TaskListT[]> {
    return this.taskListsRepository.find({
      where: { isDeleted: false },
    });
  }

  async findOne(id: number): Promise<TaskListT> {
    return this.taskListsRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async create(dto: CreateTaskListDto): Promise<TaskListT> {
    const newTaskList = this.taskListsRepository.create({ ...dto });
    return await this.taskListsRepository.save(newTaskList);
  }

  async update(id: number, dto: UpdateTaskListDto): Promise<TaskListT> {
    const taskList = await this.taskListsRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!taskList)
      throw new NotFoundException(`Task list with id ${id} not found`);
    Object.assign(taskList, dto);
    return await this.taskListsRepository.save(taskList);
  }

  async delete(id: number) {
    // TODO: select only needed fields
    const list = await this.taskListsRepository.findOne({ where: { id } });
    if (!list) throw new NotFoundException(`Task list with id ${id} not found`);

    list.isDeleted = true;
    await this.taskListsRepository.save(list);

    const tasks = await this.tasksService.findAllIdOnly(list.id);
    tasks.forEach((task) => {
      this.tasksService.delete(task.id);
    });
  }
}
