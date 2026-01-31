export const Roles = {
  admin: 'ADMIN',
  student: 'STUDENT',
  tutor: 'TUTOR',
} as const;

export const BookingStatuses = {
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  completed: 'COMPLETED',
} as const;

export const UserStatuses = {
  active: 'ACTIVE',
  banned: 'BANNED',
} as const;
