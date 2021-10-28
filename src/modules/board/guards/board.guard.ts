import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { BoardService } from '../board.service';

@Injectable()
export class BoardGuard implements CanActivate {
  constructor(private readonly boardService: BoardService) {}
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

    return this.validateRequest(request);
  }

  async validateRequest(request: ModifyExpressRequest): Promise<boolean> {
    const boardId = +request.params.boardId;
    const board = await this.boardService.findById(boardId);

    return Boolean(board);
  }
}
