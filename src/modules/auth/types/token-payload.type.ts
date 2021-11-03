import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../user/entities/user.entity';

export class TokenPayload {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ enum: Roles })
  role: Roles;
}
