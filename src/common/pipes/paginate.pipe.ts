import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginateQuery } from '../types/paginate-query.type';

@Injectable()
export class PaginatePipe
  implements PipeTransform<PaginateQuery, PaginateQuery>
{
  transform(obj: PaginateQuery, _: any): PaginateQuery {
    obj.limit = Number(obj.limit);
    obj.offset = Number(obj.offset);

    if (!obj.limit && !obj.offset) {
      const defaultPagQuery: PaginateQuery = { limit: 0, offset: 0 };

      return defaultPagQuery;
    }

    if (!obj.limit) {
      obj.limit = 0;
    }

    if (!obj.offset) {
      obj.offset = 0;
    }

    return obj;
  }
}
