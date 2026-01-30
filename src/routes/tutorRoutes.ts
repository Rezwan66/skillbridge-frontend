import { Route } from '@/types/routes.type';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Home',
    items: [
      {
        title: 'Create Blog',
        url: '/dashboard/create-blog',
      },
      {
        title: 'History',
        url: '/dashboard/history',
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
        // isActive: true,
      },
    ],
  },
];
