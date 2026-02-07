import { Route } from '@/types/route.type';

import {
  User,
  Users,
  Calendar,
  FolderOpen,
  Home,
  GraduationCap,
  TypeOutline,
} from 'lucide-react';

export const adminRoutes: Route[] = [
  {
    title: 'Platform Management',
    items: [
      {
        title: 'Overview',
        url: '/dashboard',
        icon: User, //  Add icon
      },
      {
        title: 'Manage Users',
        url: '/dashboard/users',
        icon: Users,
      },
      {
        title: 'Manage Tutors',
        url: '/dashboard/manage-tutors',
        icon: TypeOutline,
      },
      {
        title: 'All Bookings',
        url: '/dashboard/bookings',
        icon: Calendar,
      },
      {
        title: 'Manage Categories',
        url: '/dashboard/categories',
        icon: FolderOpen,
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
