import { env } from '@/env';
import { cookies } from 'next/headers';

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
        next: { tags: ['user'] },
      });
      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: 'Session is missing.' } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  getStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/users/stats`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
        next: { tags: ['stats'] },
      });
      const stats = await res.json();

      if (stats === null) {
        return { data: null, error: { message: 'Stats are missing.' } };
      }

      return { data: stats, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateMyProfile: async function (payload: { name: string; image: string }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: {
            message: 'Error: profile not updated',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
