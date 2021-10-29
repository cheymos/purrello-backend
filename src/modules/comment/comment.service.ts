import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ACCESS_DENIED,
  COMMENT_NOT_FOUND
} from '../../common/constants/error.constants';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { CardService } from '../card/card.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly cardService: CardService,
  ) {}

  create({ content }: CommentDto, cardId: number, userId: number) {
    const comment = new CommentEntity(content, userId, cardId);

    return this.commentRepository.save(comment);
  }

  async getAllCardComments(
    cardId: number,
    userId: number,
  ): Promise<PaginateResponse<CommentEntity>> {
    // must be oprimize
    const card = await this.cardService.findById(cardId, true);

    if (card.column?.board?.isPrivate && card.column.board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    const [comments, count] = await this.commentRepository.findAndCount({
      cardId,
    });

    return { data: comments, total: count };
  }

  async getOne(id: number, userId: number): Promise<CommentEntity> {
    const comment = await this.findById(id, true);

    const board = comment.card?.column?.board;

    if (board?.isPrivate && board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    delete comment.card;
    return comment;
  }

  async update(
    id: number,
    { content }: CommentDto,
    userId: number,
  ): Promise<CommentEntity> {
    const comment = await this.findById(id);

    if (comment.userId !== userId) throw new ForbiddenException(ACCESS_DENIED);

    comment.content = content;
    await this.commentRepository.update(id, comment);

    return comment;
  }

  async deleteOne(id: number, userId: number): Promise<void> {
    if (isNaN(id)) return;

    const comment = await this.commentRepository.findOne(id);

    if (!comment) return;
    if (comment.userId !== userId) throw new ForbiddenException(ACCESS_DENIED);

    await this.commentRepository.delete(id);
  }

  async findById(id: number, withCard = false): Promise<CommentEntity> {
    if (isNaN(id)) throw new NotFoundException(COMMENT_NOT_FOUND);

    let comment: CommentEntity | undefined;

    if (withCard) {
      comment = await this.commentRepository.findOne(id, {
        relations: ['card'],
      });
    } else {
      comment = await this.commentRepository.findOne(id);
    }

    if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND);

    return comment;
  }
}
