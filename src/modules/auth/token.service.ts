import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { TokenPayload } from './types/token-payload.type';
import { UserEntity } from '../user/entities/user.entity';
import {
  jwtAccessConfig,
  jwtRefreshConfig,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '../../configs/jwt.config';
import { Tokens } from './types/tokens.type';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  generateTokens(payload: TokenPayload): Tokens {
    const accessToken = sign(payload, JWT_ACCESS_SECRET, jwtAccessConfig);
    const refreshToken = sign(payload, JWT_REFRESH_SECRET, jwtRefreshConfig);

    return { accessToken, refreshToken };
  }

  generateTokenPayload({ id, username, role }: UserEntity): TokenPayload {
    return { id, username, role };
  }

  async saveRefreshToken(userId: number, token: string): Promise<void> {
    const tokenData = await this.refreshTokenRepository.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = token;
      await this.refreshTokenRepository.update(tokenData.id, tokenData);
    } else {
      const refreshToken = new RefreshTokenEntity(userId, token);
      await this.refreshTokenRepository.save(refreshToken);
    }
  }

  validateToken(
    type: 'ACCESS' | 'REFRESH',
    token: string,
  ): TokenPayload | null {
    try {
      const userData = verify(
        token,
        type === 'ACCESS' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
      ) as TokenPayload;

      return userData;
    } catch (_) {
      return null;
    }
  }

  findRefreshToken(token: string): Promise<RefreshTokenEntity | undefined> {
    return this.refreshTokenRepository.findOne({ refreshToken: token });
  }

  async removeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refreshToken: token });
  }
}
