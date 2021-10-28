import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { ACCESS_DENIED } from '../../../common/constants/error.constants';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { BoardService } from '../board.service';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class BoardGuard implements CanActivate {
  constructor(private readonly boardService: BoardService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

    return this.validateRequest(request);
  }

  async validateRequest(request: ModifyExpressRequest): Promise<boolean> {
    const boardId = +request.params.boardId;
    const board = await this.boardService.findById(boardId);

    const userId = request.userPayload?.id;

    if (userId && !this.checkAccess(userId, board))
      throw new ForbiddenException(ACCESS_DENIED);

    return true;
  }

  checkAccess(userId: number, board: BoardEntity): boolean {
    return board.ownerId === userId;
  }
}
