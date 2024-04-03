import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardT, CreateBoardDto, UpdateBoardDto } from '@packages/types';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<BoardT[]> {
    return this.boardService.findAll();
  }

  @Post()
  async create(@Body() board: CreateBoardDto): Promise<BoardT> {
    return this.boardService.create(board);
  }

  @Patch()
  async update(@Body() board: UpdateBoardDto) {
    return this.boardService.update(board);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.boardService.delete(id);
  }
}
