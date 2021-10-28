import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
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

  @Get(':id')
  getBoard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<BoardEntity> {
    return this.boardService.getOne(id, userId);
  }
}

export interface BoardResponse {
  id: number;
}
