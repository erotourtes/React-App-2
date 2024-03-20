import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { TaskPriority } from '@packages/types';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate?: string;

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listId' })
  list: TaskList;
}
