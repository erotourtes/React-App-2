import { TaskList } from 'src/task-lists/task-lists.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from '../history/history.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => TaskList, (list) => list.board, { onDelete: 'CASCADE' })
  lists: TaskList[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => History, (history) => history.board, { onDelete: 'CASCADE' })
  histories: History[];
}
