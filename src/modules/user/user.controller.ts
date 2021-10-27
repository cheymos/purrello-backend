import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginatePipe } from '../../common/pipes/paginate.pipe';
import { PaginateQuery } from '../../common/types/paginate-query.type';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { Role } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles, UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard)
  @UsePipes(MainValidationPipe)
  getUsers(
    @Query(PaginatePipe) query: PaginateQuery,
  ): Promise<PaginateResponse<UserEntity>> {
    return this.userService.getAll(query);
  }
}
