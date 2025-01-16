import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Paused = 'Paused',
  Done = 'Done',
}

export enum TaskPriority {
  High = 'Red',
  Medium = 'Yellow',
  Normal = 'Blue',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.Pending })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.Normal })
  priority: TaskPriority;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
