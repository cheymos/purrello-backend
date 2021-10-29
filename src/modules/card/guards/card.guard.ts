import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { ACCESS_DENIED } from '../../../common/constants/error.constants';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { CardService } from '../card.service';
import { CardEntity } from '../entities/card.entity';

@Injectable()
export class CardGuard implements CanActivate {
  constructor(private readonly cardService: CardService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();

    return this.validateRequest(request);
  }

  async validateRequest(request: ModifyExpressRequest): Promise<boolean> {
    const cardId = +request.params.cardId;
    const card = await this.cardService.findById(cardId, true);

    const userId = request.userPayload?.id;

    if (userId && !this.checkAccess(userId, card))
      throw new ForbiddenException(ACCESS_DENIED);

    return true;
  }

  checkAccess(userId: number, card: CardEntity): boolean {
    return card.column?.board?.ownerId === userId;
  }
}
