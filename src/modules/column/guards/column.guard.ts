import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { ACCESS_DENIED } from '../../../common/constants/error.constants';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { ColumnService } from '../column.service';
import { ColumnEntity } from '../entities/column.entity';

@Injectable()
export class ColumnGuard implements CanActivate {
  constructor(private readonly columnService: ColumnService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

    return this.validateRequest(request);
  }

  async validateRequest(request: ModifyExpressRequest): Promise<boolean> {
    const columnId = +request.params.columnId;
    const column = await this.columnService.findById(columnId, true);

    const userId = request.userPayload?.id;

    if (userId && !this.checkAccess(userId, column))
      throw new ForbiddenException(ACCESS_DENIED);

    return true;
  }

  checkAccess(userId: number, column: ColumnEntity): boolean {
    return column.board?.ownerId === userId;
  }
}
