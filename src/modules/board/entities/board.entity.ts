import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('boards')
export class BoardEntity {
  constructor(title: string, ownerId: number, isPrivate?: boolean) {
    this.title = title;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate ?? true;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ length: 255 })
  title: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  isPrivate: boolean;

  @ApiProperty()
  @Column()
  ownerId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner?: UserEntity;

  @ApiProperty()
  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
