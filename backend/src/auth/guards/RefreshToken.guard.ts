import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const refresh_token = request.cookies!['refresh_token'];
    if (!refresh_token) throw new UnauthorizedException('Login to continue');
    return true;
  }
}
