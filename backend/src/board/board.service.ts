import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from '@packages/types';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    return await this.boardRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'ASC' },
    });
  }

  async create(board: CreateBoardDto) {
    return await this.boardRepository.save(board);
  }

  async update(board: UpdateBoardDto) {
    const existingBoard = await this.boardRepository.findOne({
      where: { id: board.id },
    });
    if (!existingBoard)
      throw new NotFoundException(`Board with id ${board.id} not found`);
    return await this.boardRepository.save({
      ...existingBoard,
      ...board,
    });
  }

  async delete(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) throw new NotFoundException(`Board with id ${id} not found`);

    await this.boardRepository.remove(board);
  }
}
