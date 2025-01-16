import { IsEnum, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  isActive?: boolean;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  name?: string;
}

export class PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}
