import { Role, UserStatus } from './constants.type';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  role: Role;
  status?: UserStatus;
}
