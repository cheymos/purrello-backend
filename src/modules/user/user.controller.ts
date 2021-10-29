import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginatePipe } from '../../common/pipes/paginate.pipe';
import { PaginateQuery } from '../../common/types/paginate-query.type';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../utils/get-paginate-response-options.util';
import { Role } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles, UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiQuery({ type: PaginateQuery })
  @ApiExtraModels(UserEntity)
  @ApiResponse(getPaginateResponseOptions(UserEntity))
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //--------------------
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
