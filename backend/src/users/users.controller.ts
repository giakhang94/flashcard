import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializerInterceptor } from 'src/auth/interceptors/serializer.interceptor';
import { ResponseAllUserDto } from './dtos/all-user-response.dto';
import { GetCurrentUser } from 'src/auth/decorators/GetCurrentUser.decorator';
import { UserPayload } from 'src/types';
import { JwtGuard } from 'src/auth/guards/Jwt.guard';
import { JwtGuard_RefreshToken } from 'src/auth/guards/Jwt-refresh-token.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all-users')
  @UseInterceptors(new SerializerInterceptor(ResponseAllUserDto))
  @UseGuards(JwtGuard)
  getAllUsers(@GetCurrentUser() userPayload: UserPayload) {
    return this.usersService.getAllUser(userPayload);
  }

  @Get('me')
  @UseGuards(JwtGuard_RefreshToken)
  me(@GetCurrentUser() user: UserPayload) {
    return user;
  }
}
