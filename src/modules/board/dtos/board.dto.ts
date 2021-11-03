import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class BoardDto {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsString()
  @Length(1, 255)
  readonly title: string;

  @ApiProperty()
  @IsBoolean()
  readonly isPrivate: boolean;
}
