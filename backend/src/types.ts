import { Role } from '@prisma/client';

export interface UserPayload {
  userId: string;
  role: Role;
  isAllow: boolean;
  email: string;
}
