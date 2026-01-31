import { BookingStatuses, Roles, UserStatuses } from '@/constants';

export type Role = (typeof Roles)[keyof typeof Roles];

export type BookingStatus =
  (typeof BookingStatuses)[keyof typeof BookingStatuses];

export type UserStatus = (typeof UserStatuses)[keyof typeof UserStatuses];
