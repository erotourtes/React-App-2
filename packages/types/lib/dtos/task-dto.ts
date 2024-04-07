import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  MaxLength,
} from "class-validator";

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export class CreateTaskDto {
  @MaxLength(128)
  name: string;

  @MaxLength(65_535)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsInt()
  listId: number;
}

// TODO
export class UpdateTaskDto {
  @IsInt()
  id: number;

  @IsOptional()
  @MaxLength(128)
  name?: string;

  @IsOptional()
  @MaxLength(65_535)
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsInt()
  listId?: number;
}

export type TaskT = {
  id: number;
  name: string;
  description: string;
  dueDate?: string;
  priority: TaskPriority;
  createdAt?: string | Date;
  list: { id: number };
};
