import { Expose, Type } from 'class-transformer';

import { ResponseUserDto } from './responseUserDto';

export class ResponseAllUserDto {
  @Expose()
  @Type(() => ResponseUserDto)
  result: ResponseUserDto[];
}
