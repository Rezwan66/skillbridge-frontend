import { Route } from '@/types/route.type';

import {
  User,
  BookOpen,
  Calendar,
  Settings,
  Home,
  GraduationCap,
} from 'lucide-react';

export const studentRoutes: Route[] = [
  {
    title: 'Student Home',
    items: [
      {
        title: 'Overview',
        url: '/dashboard',
        icon: User,
      },
      {
        title: 'Book Courses',
        url: '/dashboard/create-booking',
        icon: BookOpen,
      },
      {
        title: 'My Bookings',
        url: '/dashboard/bookings',
        icon: Calendar,
      },
      {
        title: 'Edit Profile',
        url: '/dashboard/edit-profile',
        icon: Settings,
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
