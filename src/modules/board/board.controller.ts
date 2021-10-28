import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { BoardService } from './board.service';
import { BoardDto } from './dtos/board.dto';

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
}

export interface BoardResponse {
  id: number;
}
