import { Route } from '@/types/routes.type';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Home',
    items: [
      {
        title: 'My Profile',
        url: '/dashboard',
      },
      {
        title: 'Profile?',
        url: '/dashboard/profile',
      },
      {
        title: 'My Schedule',
        url: '/dashboard/bookings',
      },
      {
        title: 'Add Slots',
        url: '/dashboard/availability',
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
