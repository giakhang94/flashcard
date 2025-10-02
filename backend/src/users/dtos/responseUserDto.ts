import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  isAllow: boolean;

  @Expose()
  role: Role;
}
