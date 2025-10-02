//get current user by the long-term token (refresh_token) when client sends a refresh_token request
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRefreshTokenUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const refresh_token = request.cookies!['refresh_token'];
    return refresh_token;
  },
);
