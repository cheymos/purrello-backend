import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../user/entities/user.entity';

export const Role = (role: Roles) => SetMetadata('role', role);
