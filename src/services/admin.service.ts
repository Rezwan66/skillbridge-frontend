import { env } from '@/env';
import { UserStatus } from '@/types/constants.type';
import { FetchOptions } from '@/types/data-fetch.type';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const adminService = {
  getAllUsers: async function (options?: FetchOptions) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/admin/users`);

      const config: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      };
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['allUsers'] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  updateUserStatus: async function (
    id: string,
    payload: { status: UserStatus },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateTutorFeaturedStatus: async function (
    id: string,
    payload: { isFeatured: boolean },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/tutors/${id}/isfeatured`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
