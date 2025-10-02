import { Response } from 'express';

export const attachToken = async (
  response: Response,
  token: string,
  tokenName: string,
  expires: number,
) => {
  response.cookie(tokenName, token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + expires * 60 * 60 * 1000),
  });
};
