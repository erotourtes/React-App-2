import { IsArray, IsInt, MaxLength } from 'class-validator';

export class CreateTaskListDto {
  @MaxLength(128)
  name: string;

  @IsArray()
  @IsInt({ each: true })
  tasksIds: number[];

  @IsInt()
  boardId: number;
}

export class UpdateTaskListDto {
  @MaxLength(128)
  name: string;
}

export type TaskListT = {
  id: number;
  name: string;
  boardId: number;
}
