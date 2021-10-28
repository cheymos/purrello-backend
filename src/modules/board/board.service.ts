import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ACCESS_DENIED,
  BOARD_NOT_FOUND
} from '../../common/constants/error.constants';
import { BoardDto } from './dtos/board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}
  async create(
    { title, isPrivate }: BoardDto,
    userId: number,
  ): Promise<BoardEntity> {
    const board = new BoardEntity(title, userId, isPrivate);

    return this.boardRepository.save(board);
  }

  async getOne(id: number, userId: number): Promise<BoardEntity> {
    const board = await this.findById(id);

    if (board.isPrivate && board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    return board;
  }

  async update(
    boardId: number,
    { title, isPrivate }: BoardDto,
    userId: number,
  ): Promise<BoardEntity> {
    const board = await this.findById(boardId);

    if (board.ownerId !== userId) throw new ForbiddenException(ACCESS_DENIED);
    Object.assign(board, { title, isPrivate });

    await this.boardRepository.update(boardId, board);

    return board;
  }

  async deleteOne(id: number, userId: number): Promise<void> {
    if (isNaN(id)) return;

    const board = await this.boardRepository.findOne(id);

    if (!board) return;
    if (board?.ownerId !== userId) throw new ForbiddenException(ACCESS_DENIED);

    await this.boardRepository.delete(id);
  }

  async findById(id: number): Promise<BoardEntity> {
    if (isNaN(id)) throw new NotFoundException(BOARD_NOT_FOUND);

    const board = await this.boardRepository.findOne(id);

    if (!board) throw new NotFoundException(BOARD_NOT_FOUND);

    return board;
  }
}
