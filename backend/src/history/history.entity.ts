import { HistoryActionType } from '@packages/types';
import { Board } from 'src/board/board.entity';
import { Task } from 'src/tasks/tasks.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export { HistoryActionType };

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: HistoryActionType,
  })
  actionType: HistoryActionType;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 20, default: '' })
  fieldName: string;

  @Column({ length: 128, nullable: true })
  oldValue: string;

  @Column({ length: 128, nullable: true })
  newValue: string;

  @ManyToOne(() => Task, (task) => task.histories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recordId' })
  task: Task;

  @Column()
  recordId: number;

  @ManyToOne(() => Board, (board) => board.histories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column()
  boardId: number;
}
