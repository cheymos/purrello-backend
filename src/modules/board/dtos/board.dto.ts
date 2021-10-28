import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class BoardDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsBoolean()
  isPrivate: boolean;
}
