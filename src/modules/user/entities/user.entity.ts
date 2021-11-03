import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  BANNED = 'banned',
}

@Entity('users')
export class UserEntity {
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 36, unique: true })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @ApiProperty()
  @Column('text', { select: false })
  password: string;

  @ApiProperty({ enum: Roles, enumName: 'Roles' })
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}
