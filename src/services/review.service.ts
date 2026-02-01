import { env } from '@/env';
import { FetchOptions } from '@/types/data-fetch.type';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const reviewService = {
  createReview: async function (payload: {
    bookingId: string;
    rating: number;
    comment?: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/reviews`, {
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
            message: 'Error: review not posted',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  getAllReviews: async function (options?: FetchOptions) {
    try {
      const url = new URL(`${API_URL}/api/reviews`);
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['reviews'] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};
