import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  isAllow: boolean;

  @IsOptional()
  role: Role;
}
