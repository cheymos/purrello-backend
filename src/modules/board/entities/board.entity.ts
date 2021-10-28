import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('boards')
export class BoardEntity {
  constructor(title: string, ownerId: number, isPrivate?: boolean) {
    this.title = title;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate ?? true;
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'boolean', default: true })
  isPrivate: boolean;

  @Column()
  ownerId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
