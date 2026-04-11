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
      
      // FORCING NO-STORE TO BUST PERSISTENT DEVELOPMENT CACHE:
      config.cache = 'no-store';

      const res = await fetch(url.toString(), config);
      const data = await res.json();
      // console.log('from service-->',data);
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
        cache: 'no-store',
        next: { tags: ['booking'] },
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

      if (!data.success) {
        return {
          data: null,
          error: {
            message: data.message ?? 'Error: Booking not created',
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

      if (!data.success) {
        return { data: null, error: { message: data.message ?? 'Update Failed' } };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  initiatePayment: async function (bookingId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/bookings/initiate-payment/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      if (!data.success) {
        return { data: null, error: { message: data.message ?? 'Payment Initiation Failed' } };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
