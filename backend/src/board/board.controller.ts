import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from '@packages/types';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.boardService.findOne(id);
  }

  @Post()
  async create(@Body() board: CreateBoardDto) {
    return this.boardService.create(board);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.boardService.delete(id);
  }
}
