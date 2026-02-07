import { Role } from '@/types/constants.type';

// Role-based route permissions
export const ROLE_ROUTES: Record<Role, string[]> = {
  ADMIN: [
    '/dashboard/users',
    '/dashboard/bookings',
    '/dashboard/categories',
    '/dashboard/manage-tutors',
  ],
  TUTOR: [
    '/dashboard/bookings',
    '/dashboard/availability',
    '/dashboard/profile',
    '/dashboard/categories',
  ],
  STUDENT: [
    '/dashboard/create-booking',
    '/dashboard/edit-profile',
    '/dashboard/bookings',
  ],
};
