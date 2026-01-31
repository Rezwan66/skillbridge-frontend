import { Route } from '@/types/routes.type';

export const adminRoutes: Route[] = [
  {
    title: 'User Management',
    items: [
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
      },
      {
        title: 'Users',
        url: '/dashboard/users',
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
        title: 'Data Fetching',
        url: '#',
        isActive: true,
      },
    ],
  },
];
