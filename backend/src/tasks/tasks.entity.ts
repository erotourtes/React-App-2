import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { TaskPriority } from '@packages/types';
import { History } from 'src/history/history.entity';

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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listId' })
  list: TaskList;

  @OneToMany(() => History, (history) => history.recordId, {
    onDelete: 'SET NULL',
  })
  histories: History[];
}
