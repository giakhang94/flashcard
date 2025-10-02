import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserPayload } from 'src/types';
import { attachToken } from 'src/ultis/attachToken';
import { comparePassword } from 'src/ultis/hashPassword';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new NotFoundException('user not found');
    const isMatchPw = comparePassword(user.password, password);
    if (!isMatchPw) {
      return null;
    }
    return user;
  }

  async login(user: User, response: Response) {
    //token
    const authenticationToken = this.jwtService.sign({
      userId: user.id,
      role: user.role,
      isAllow: user.isAllow,
    });
    //refresh token
    const refreshToken = this.jwtService.sign(
      { userId: user.id, role: user.role, isAllow: user.isAllow },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn:
          this.configService.getOrThrow('JWT_REFRESH_EXP') +
          this.configService.getOrThrow('JWT_EXP_UNIT'),
      },
    );
    //attach token
    attachToken(
      response,
      authenticationToken,
      'authentication_token',
      this.configService.getOrThrow('JWT_EXP'),
    );
    attachToken(
      response,
      refreshToken,
      'refresh_token',
      this.configService.getOrThrow('JWT_REFRESH_EXP'),
    );

    return user;
  }

  refreshToken(response: Response, refresh_token: string) {
    const userPayload = this.jwtService.verify(refresh_token, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    });
    const newAuthenticationToken = this.jwtService.sign({
      userId: userPayload.userId,
      role: userPayload.role,
      isAllow: userPayload.isAllow,
    });
    attachToken(
      response,
      newAuthenticationToken,
      'authentication_token',
      this.configService.getOrThrow('JWT_EXP'),
    );
    return { message: 'OK' };
  }

  async logout(response: Response) {
    attachToken(response, '', 'refresh_token', 0);
    attachToken(response, '', 'authentication_token', 0);

    return { message: 'user logout out successfully' };
  }
}
