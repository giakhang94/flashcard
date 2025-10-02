import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
