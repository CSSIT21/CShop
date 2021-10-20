import { SetMetadata } from '@nestjs/common';

export type Role = "USER" | "SELLER" | "ADMIN";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);