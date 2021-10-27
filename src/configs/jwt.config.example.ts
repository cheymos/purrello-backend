import { SignOptions } from 'jsonwebtoken';

export const JWT_ACCESS_SECRET = 'YOUR_SECRET_KEY';
export const JWT_REFRESH_SECRET = 'YOUR_SECRET_KEY';

export const jwtAccessConfig: SignOptions = {
  expiresIn: '30m',
};

export const jwtRefreshConfig: SignOptions = {
  expiresIn: '30d',
};
