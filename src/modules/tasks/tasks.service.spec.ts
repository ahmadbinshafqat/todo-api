import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskPriority, TaskStatus } from '../../entities/task.entity';
import { Repository } from 'typeorm';

const mockTaskRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAndCount: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = { name: 'Test Task', dueDate: new Date(), priority: TaskPriority.Normal };
    mockTaskRepository.create.mockReturnValue(taskData);
    mockTaskRepository.save.mockResolvedValue(taskData);

    const result = await service.createTask(taskData);
    expect(result).toEqual(taskData);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
    expect(mockTaskRepository.save).toHaveBeenCalledWith(taskData);
  });

  it('should fetch tasks', async () => {
    const tasks = [{ id: 1, name: 'Task 1' }];
    const count = 1;
    mockTaskRepository.findAndCount.mockResolvedValue([tasks, count]);
  
    const result = await service.getTasks({}, { skip: 0, take: 10 });
  
    // Updated expectation to match the new response structure
    expect(result).toEqual({
      data: tasks,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalCount: count,
        totalPages: 1
      }
    });
  
    expect(mockTaskRepository.findAndCount).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 10,
    });
  });
});
