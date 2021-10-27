import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  EMAIL_IS_ALREADY_USE,
  USERNAME_IS_ALREADY_USE,
} from '../../common/constants/error.constants';
import {
  Errors,
  InvalidFieldsException,
} from '../../common/exceptions/invalid-fields.exception';
import { RegisterDto } from '../dtos/register.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register({ email, username, password }: RegisterDto): Promise<void> {
    const errors: Errors<UserEntity> = {};

    const userByEmail = await this.userService.findBy('email', email);
    const userByUsername = await this.userService.findBy('username', username);

    if (userByEmail) errors.email = [EMAIL_IS_ALREADY_USE];

    if (userByUsername) errors.username = [USERNAME_IS_ALREADY_USE];

    if (Object.keys(errors).length > 0) {
      throw new InvalidFieldsException(errors);
    }

    const passwordHash = await bcrypt.hash(password, 5);

    await this.userService.create({ email, username, password: passwordHash });
  }
}
