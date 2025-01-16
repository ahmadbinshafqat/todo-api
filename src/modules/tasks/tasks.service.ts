import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(taskData: Partial<Task>) {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async getTasks(filters: Partial<Task>, pagination: { skip: number; take: number }) {
    const [tasks, totalCount] = await this.taskRepository.findAndCount({
      where: filters,
      skip: pagination.skip,
      take: pagination.take,
    });

    const totalPages = Math.ceil(totalCount / pagination.take);

    return {
      data: tasks,
      pagination: {
        currentPage: Math.floor(pagination.skip / pagination.take) + 1, // To get the current page
        pageSize: pagination.take,
        totalCount,
        totalPages,
      },
    };
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(id: number, updateData: Partial<Task>) {
    return await this.taskRepository.update(id, updateData);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }
}
