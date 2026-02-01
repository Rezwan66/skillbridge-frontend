import { env } from '@/env';
import { FetchOptions } from '@/types/data-fetch.type';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const bookingService = {
  getMyBookings: async function (options?: FetchOptions) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/bookings`);

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
      config.next = { ...config.next, tags: ['bookings'] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  getBookingById: async function (bookingId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  createBooking: async function (payload: { availabilityId: string }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/bookings`, {
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
            message: 'Error: Booking not created',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateBookingStatus: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
