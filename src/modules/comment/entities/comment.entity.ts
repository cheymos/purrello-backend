import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('comments')
export class CommentEntity {
  constructor(content: string, userId: number, cardId: number) {
    this.content = content;
    this.userId = userId;
    this.cardId = cardId;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty()
  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @ApiProperty()
  @Column()
  cardId: number;

  @ManyToOne(() => CardEntity, { onDelete: 'CASCADE' })
  card?: CardEntity;

  @ApiProperty()
  @CreateDateColumn()
  readonly createdAt: Date;

  @ApiProperty()
  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
