import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy_RefreshToken } from './strategies/refreshToken-jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtStrategy_RefreshToken,
  ],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.getOrThrow('JWT_SECRET'),
          signOptions: {
            expiresIn:
              configService.getOrThrow('JWT_EXP') +
              configService.getOrThrow('JWT_EXP_UNIT'),
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
