import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ACCESS_DENIED,
  CARD_NOT_FOUND
} from '../../common/constants/error.constants';
import { BoardService } from '../board/board.service';
import { CardDto } from './dtos/card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly boardService: BoardService,
  ) {}

  async create(
    { content, pos }: CardDto,
    columnId: number,
    boardId: number,
    userId: number,
  ): Promise<CardEntity> {
    // add a check to position
    const board = await this.boardService.findById(boardId);

    if (board.ownerId !== userId) throw new ForbiddenException(ACCESS_DENIED);

    const card = new CardEntity(content, pos, columnId);
    return this.cardRepository.save(card);
  }

  async getOne(id: number, userId: number): Promise<CardEntity> {
    const card = await this.findById(id, true);
    const board = card?.column?.board;

    if (board?.isPrivate && board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    delete card.column;
    return card;
  }

  async update(
    id: number,
    { content, pos }: CardDto,
    userId: number,
  ): Promise<CardEntity> {
    const card = await this.findById(id, true);

    if (card.column?.board?.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    delete card.column;
    Object.assign(card, { content, pos });
    await this.cardRepository.update(id, card);

    return card;
  }

  async deleteOne(id: number, userId: number): Promise<void> {
    if (isNaN(id)) return;

    const card = await this.cardRepository.findOne(id, {
      relations: ['column', 'column.board'],
    });

    if (!card) return;
    if (card?.column?.board?.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    await this.cardRepository.delete(id);
  }

  async findById(id: number, withBoard = false): Promise<CardEntity> {
    if (isNaN(id)) throw new NotFoundException(CARD_NOT_FOUND);

    let card: CardEntity | undefined;

    if (withBoard) {
      card = await this.cardRepository.findOne(id, {
        relations: ['column', 'column.board'],
      });
    } else {
      card = await this.cardRepository.findOne(id);
    }

    if (!card) throw new NotFoundException(CARD_NOT_FOUND);

    return card;
  }
}
