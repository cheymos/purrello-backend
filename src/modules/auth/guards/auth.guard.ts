import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_DENIED } from '../../../common/constants/error.constants';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { Roles } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<ModifyExpressRequest>();
    const role = this.reflector.get<Roles>('role', context.getHandler());

    const { userPayload } = request;
    if (!userPayload) throw new UnauthorizedException();

    return this.checkAccess(userPayload.id, role);
  }

  async checkAccess(userId: number, role = Roles.USER): Promise<boolean> {
    const isAllowedAccess = await this.authService.checkRole(userId, role);

    if (!isAllowedAccess) throw new ForbiddenException(ACCESS_DENIED);

    return true;
  }
}
