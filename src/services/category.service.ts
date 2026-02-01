import { env } from '@/env';
import { FetchOptions } from '@/types/data-fetch.type';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const categoryService = {
  getAllCategories: async function (options?: FetchOptions) {
    try {
      const url = new URL(`${API_URL}/api/categories`);
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['categories'] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // getTutorById: async function (id: string) {
  //   try {
  //     const res = await fetch(`${API_URL}/api/tutors/${id}`);
  //     const data = await res.json();

  //     return { data, error: null };
  //   } catch (error) {
  //     return { data: null, error: { message: 'Something Went Wrong!' } };
  //   }
  // },

  createCategory: async function (payload: { name: string }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
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
            message: 'Error: category not created',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateCategoryStatus: async function (payload: {
    id: string;
    isActive: boolean;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories/${payload.id}`, {
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
            message: 'Error: category status not updated',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
