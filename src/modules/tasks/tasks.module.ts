import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register Task entity
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
