import { Route } from '@/types/route.type';

import {
  User,
  UserCircle,
  CalendarDays,
  CalendarPlus,
  Home,
  GraduationCap,
} from 'lucide-react';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Home',
    items: [
      {
        title: 'My Profile',
        url: '/dashboard',
        icon: User,
      },
      {
        title: 'Profile?',
        url: '/dashboard/create-profile',
        icon: UserCircle,
      },
      {
        title: 'My Schedule',
        url: '/dashboard/bookings',
        icon: CalendarDays,
      },
      {
        title: 'Add Slots',
        url: '/dashboard/availability',
        icon: CalendarPlus,
      },
    ],
  },
  {
    title: 'Main Website',
    items: [
      {
        title: 'Home',
        url: '/',
        icon: Home,
      },
      {
        title: 'Tutors',
        url: '/tutors',
        icon: GraduationCap,
      },
    ],
  },
];
