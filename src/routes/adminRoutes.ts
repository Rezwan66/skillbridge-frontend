import { Route } from '@/types/routes.type';

export const adminRoutes: Route[] = [
  {
    title: 'Platform Management',
    items: [
      {
        title: 'My Profile',
        url: '/dashboard',
      },
      {
        title: 'Manage Users',
        url: '/dashboard/users',
      },
      {
        title: 'All Bookings',
        url: '/dashboard/bookings',
      },
      {
        title: 'Manage Categories',
        url: '/dashboard/categories',
      },
    ],
  },
  {
    title: 'Main Website',
    items: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Tutors',
        url: '/tutors',
        // isActive: true,
      },
    ],
  },
];
