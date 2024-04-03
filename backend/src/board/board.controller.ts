import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardT, CreateBoardDto, TaskListT } from '@packages/types';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<BoardT[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TaskListT[]> {
    return this.boardService.findOne(id);
  }

  @Post()
  async create(@Body() board: CreateBoardDto): Promise<BoardT> {
    return this.boardService.create(board);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.boardService.delete(id);
  }
}
