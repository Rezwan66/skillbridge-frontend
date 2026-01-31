import { Role } from '@/types/constants.type';

// Role-based route permissions
export const ROLE_ROUTES: Record<Role, string[]> = {
  ADMIN: ['/dashboard/analytics', '/dashboard/users'],
  TUTOR: ['/dashboard/profile', '/dashboard/courses', '/dashboard/history'],
  STUDENT: ['/dashboard/enrolled', '/dashboard/profile'],
};
