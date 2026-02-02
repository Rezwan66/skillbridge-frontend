import { Route } from '@/types/routes.type';

export const studentRoutes: Route[] = [
  {
    title: 'Student Home',
    items: [
      {
        title: 'My Profile',
        url: '/dashboard',
      },
      {
        title: 'Book Courses',
        url: '/dashboard/create-booking',
      },
      {
        title: 'My Bookings',
        url: '/dashboard/bookings',
      },
      {
        title: 'Edit Profile',
        url: '/dashboard/edit-profile',
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
