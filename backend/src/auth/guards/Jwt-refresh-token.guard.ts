import { AuthGuard } from '@nestjs/passport';

export class JwtGuard_RefreshToken extends AuthGuard('jwt-refresh') {}
