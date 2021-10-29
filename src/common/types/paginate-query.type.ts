import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  offset: number;
}
