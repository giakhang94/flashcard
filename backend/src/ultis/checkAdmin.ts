import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

export const isAdmin = (role: Role) => {
  if (role !== Role.admin) {
    throw new ForbiddenException('You can not do this task');
  }
};
