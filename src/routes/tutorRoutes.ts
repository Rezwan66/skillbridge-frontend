import { Route } from '@/types/route.type';

import {
  User,
  UserCircle,
  CalendarDays,
  CalendarPlus,
  Home,
  GraduationCap,
  Shapes,
} from 'lucide-react';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Home',
    items: [
      {
        title: 'Overview',
        url: '/dashboard',
        icon: User,
      },
      {
        title: 'Tutor Profile',
        url: '/dashboard/profile',
        icon: UserCircle,
      },
      {
        title: 'Teaching Categories',
        url: '/dashboard/categories',
        icon: Shapes,
      },
      {
        title: 'Availability',
        url: '/dashboard/availability',
        icon: CalendarPlus,
      },
      {
        title: 'My Schedule',
        url: '/dashboard/bookings',
        icon: CalendarDays,
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
