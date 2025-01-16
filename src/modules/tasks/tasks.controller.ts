import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { Task, TaskPriority, TaskStatus } from '../../entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get()
  async getTasks(
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    return await this.tasksService.getTasks({ status, priority }, { skip, take: limit });
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return await this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return await this.tasksService.deleteTask(id);
  }
}
