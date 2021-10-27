import { TokenPayload } from './token-payload.type';

export interface LoginResponse {
  user: TokenPayload;
  accessToken: string;
  refreshToken: string;
}
