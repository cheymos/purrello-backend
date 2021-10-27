import { Roles } from '../../user/entities/user.entity';

export interface TokenPayload {
  id: number;
  username: string;
  role: Roles;
}
