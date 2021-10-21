import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.decorator';

export const Roles = (...roles: Role[]) => SetMetadata('except', roles);