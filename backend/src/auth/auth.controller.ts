import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-usser.dto';
import { LocalGuard } from './guards/Local.guard';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { GetCurrentUser } from './decorators/GetCurrentUser.decorator';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { SerializerInterceptor } from './interceptors/serializer.interceptor';
import { ResponseUserDto } from 'src/users/dtos/responseUserDto';
import { JwtGuard } from './guards/Jwt.guard';
import { UserPayload } from 'src/types';
import { JwtGuard_RefreshToken } from './guards/Jwt-refresh-token.guard';
import { RefreshTokenGuard } from './guards/RefreshToken.guard';
import { GetRefreshTokenUser } from './decorators/GetRefreshUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('hello')
  hello() {
    return 'hello';
  }

  @Post('register')
  @UseGuards(JwtGuard)
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
  createUser(@Body() body: CreateUserDto, @GetCurrentUser() user: UserPayload) {
    return this.userService.createUser(body, user);
  }

  @Post('login')
  @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
  @UseGuards(LocalGuard)
  loginUser(
    @GetCurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('login..');
    return this.authService.login(user, response);
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(
    @Res({ passthrough: true }) response: Response,
    @GetRefreshTokenUser() token: string,
  ) {
    return this.authService.refreshToken(response, token);
  }

  @Get('logout')
  @UseGuards(RefreshTokenGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
