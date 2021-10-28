import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
