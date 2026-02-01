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
};
