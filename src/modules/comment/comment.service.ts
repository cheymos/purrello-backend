import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './dtos/comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  create({ content }: CommentDto, cardId: number, userId: number) {
    const comment = new CommentEntity(content, userId, cardId);

    return this.commentRepository.save(comment);
  }
}
