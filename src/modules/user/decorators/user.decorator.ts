import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ModifyExpressRequest } from '../../../common/types/modify-express-request.type';
import { TokenPayload } from '../../auth/types/token-payload.type';

/*
 * Object with the TokenPayload properties will be returned if param Data is not specified.
 */
export const User = createParamDecorator(
  (data: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ModifyExpressRequest>();

    if (!request.userPayload) {
      return null;
    }

    const user = request.userPayload;

    return data ? user?.[data] : user;
  },
);
