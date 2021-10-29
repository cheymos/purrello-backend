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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { BoardService } from './board.service';
import { BoardDto } from './dtos/board.dto';
import { BoardEntity } from './entities/board.entity';

export class BoardResponse {
  @ApiProperty()
  id: number;
}

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: 'Add a new board' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: BoardResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //------------------------------
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

  @ApiOperation({ summary: 'Return all user boards' })
  @ApiBearerAuth()
  @ApiExtraModels(PaginateResponse, BoardEntity)
  @ApiResponse(getPaginateResponseOptions(BoardEntity))
  @ApiResponse({ status: 403, description: 'Access denied' })
  //-----------------------------------
  @Get()
  @UseGuards(AuthGuard)
  getUserBoards(
    @User('id') userId: number,
  ): Promise<PaginateResponse<BoardEntity>> {
    return this.boardService.getAllUserBoards(userId);
  }

  @ApiOperation({ summary: 'Find board by id' })
  @ApiResponse({
    status: 200,
    type: BoardEntity,
    description: 'Successful operation',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied (if the board is private)',
  })
  @ApiResponse({ status: 404, description: 'Board not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //-----------------------------------
  @Get(':id')
  getBoard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<BoardEntity> {
    return this.boardService.getOne(id, userId);
  }

  @ApiOperation({ summary: 'Update board by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //-----------------------------------
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

  @ApiOperation({ summary: 'Delete board by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //------------------------------------
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
