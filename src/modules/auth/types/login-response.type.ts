import { ApiProperty } from '@nestjs/swagger';
import { TokenPayload } from './token-payload.type';

export class LoginResponse {
  @ApiProperty()
  user: TokenPayload;

  @ApiProperty({ example: '123456789abcd' })
  accessToken: string;

  @ApiProperty({ example: '123456789abcd' })
  refreshToken: string;
}
