import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/ultis/hashPassword';
import { CreateUserDto } from './dtos/create-usser.dto';
import { UserPayload } from 'src/types';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUser(body: CreateUserDto, userPayload: UserPayload) {
    if (userPayload.role !== Role.admin)
      throw new ForbiddenException('only admin can create create new user');
    const hashedPw = await hashPassword(body.password, 8);
    const checkUser = await this.findUserByEmail(body.email);
    if (checkUser) throw new BadRequestException('email is in used');
    const user = await this.prisma.user.create({
      data: { ...body, password: hashedPw },
    });
    return user;
  }

  async getAllUser(userPayload: UserPayload) {
    if (userPayload.role !== Role.admin)
      throw new ForbiddenException('You can not view all users');
    const result = await this.prisma.user.findMany();
    return { result };
  }
}
