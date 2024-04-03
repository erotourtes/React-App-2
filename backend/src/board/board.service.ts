import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskListsService } from 'src/task-lists/task-lists.service';
import { CreateBoardDto } from '@packages/types';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private listService: TaskListsService,
  ) {}

  async findAll() {
    return await this.boardRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number) {
    const boardLists = await this.boardRepository.findOne({
      select: ['lists'],
      where: { id, isDeleted: false },
      relations: { lists: true },
    });
    return boardLists.lists;
  }

  async create(board: CreateBoardDto) {
    return await this.boardRepository.save(board);
  }

  async delete(id: number) {
    const board = await this.boardRepository.findOne({
      select: {
        id: true,
        lists: { id: true },
      },
      relations: { lists: true },
      where: { id },
    });
    if (!board) throw new NotFoundException(`Board with id ${id} not found`);

    const promises = [];
    for (const list of board.lists) {
      list.isDeleted = true;
      promises.push(this.listService.delete(list.id));
    }
    board.isDeleted = true;
    promises.push(this.boardRepository.save(board));

    await Promise.all(promises);
  }
}
