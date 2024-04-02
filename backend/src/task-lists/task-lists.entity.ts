import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { Board } from 'src/board/board.entity';

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

  @ManyToOne(() => Board, (board) => board.lists)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column()
  boardId: number;
}
