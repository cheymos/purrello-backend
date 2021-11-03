import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'elonmusk@email.com', maxLength: 254 })
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @ApiProperty({ example: 'password', minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
