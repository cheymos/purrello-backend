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

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('text')
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @Column()
  cardId: number;

  @ManyToOne(() => CardEntity, { onDelete: 'CASCADE' })
  card?: CardEntity;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
