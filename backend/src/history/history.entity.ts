import { HistoryActionType } from '@packages/types';
import { Board } from 'src/board/board.entity';
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
  actionType: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 128 })
  tableName: string;

  @Column({ length: 20, default: '' })
  fieldName: string;

  @Column({ length: 128, nullable: true })
  oldValue: string;

  @Column({ length: 128, nullable: true })
  newValue: string;

  @Column()
  recordId: number;

  @ManyToOne(() => Board, (board) => board.histories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column()
  boardId: number;
}
