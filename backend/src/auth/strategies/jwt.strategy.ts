import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies!['authentication_token'];
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    return payload;
  }
}

// if the authentication token is invalid => backend will send 401, unauthorized message
// client have to send a refresh token request after receiving this message
// backend will check the long term token (refresh_token)
// ==> require to re login if the refresh_token is invalid
// ==> provide a new authentication token if the refresh_token is valid
