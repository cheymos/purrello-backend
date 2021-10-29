import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Cookies } from '../../common/decorators/cookies.decorator';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './types/login-response.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration in system' })
  @ApiResponse({ status: 201, description: 'Successful operation' })
  //---------------------------
  @Post('register')
  @UsePipes(MainValidationPipe)
  async register(@Body() registerData: RegisterDto): Promise<void> {
    await this.authService.register(registerData);
  }

  @ApiOperation({ summary: 'Logs user into the system' })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
    description: `Returns LoginResponse and sets "refreshToken" cookies`,
  })
  // ----------------------------
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(MainValidationPipe)
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.authenticateUser(loginData);
    const response = await this.authService.buildLoginResponse(user);
    this.placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  @ApiOperation({ summary: 'Logs out current logged in user session' })
  @ApiResponse({ status: 204, description: 'Successful operation' })
  //-------------------------------
  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
  }

  @ApiOperation({
    summary: 'Updating refresh and access tokens',
  })
  @ApiResponse({
    type: LoginResponse,
    description: 'Successful operation (refresh token must be in cookies)',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // -------------------------------
  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = await this.authService.refresh(refreshToken);

    const response = await this.authService.buildLoginResponse(user);
    this.placeRefreshTokenInCookies(res, response.refreshToken);

    return response;
  }

  private placeRefreshTokenInCookies(
    res: Response<LoginResponse>,
    refreshToken: string,
  ): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 2592000000, // 30 days of life - 30 * 24 * 60 * 60 * 1000
    });
  }
}
