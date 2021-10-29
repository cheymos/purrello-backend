import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { BoardService } from './board.service';
import { BoardDto } from './dtos/board.dto';
import { BoardEntity } from './entities/board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(MainValidationPipe)
  async createBoard(
    @Body() data: BoardDto,
    @User('id') userId: number,
  ): Promise<BoardResponse> {
    const board = await this.boardService.create(data, userId);

    return { id: board.id };
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserBoards(
    @User('id') userId: number,
  ): Promise<PaginateResponse<BoardEntity>> {
    return this.boardService.getAllUserBoards(userId);
  }

  @Get(':id')
  getBoard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<BoardEntity> {
    return this.boardService.getOne(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @UsePipes(MainValidationPipe)
  async updateBoard(
    @Param('id') boardId: number,
    @Body() data: BoardDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.boardService.update(boardId, data, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteBoard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.boardService.deleteOne(id, userId);
  }
}

export interface BoardResponse {
  id: number;
}
