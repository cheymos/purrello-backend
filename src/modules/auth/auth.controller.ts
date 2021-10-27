import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(MainValidationPipe)
  async register(@Body() registerData: RegisterDto): Promise<void> {
    await this.authService.register(registerData);
  }
}
