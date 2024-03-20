import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity('task_list')
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Task, (task) => task.list, { onDelete: 'CASCADE' })
  tasks: Task[];
}
