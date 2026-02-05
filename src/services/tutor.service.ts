import { env } from '@/env';
import { FetchOptions } from '@/types/data-fetch.type';
import { TutorCreateProfile, TutorSearchParams } from '@/types/tutor.type';
import { cookies } from 'next/headers';

const API_URL = env.API_URL;

export const tutorService = {
  getAllTutors: async function (
    params?: TutorSearchParams,
    options?: FetchOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/api/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['tutors'] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/tutors/${id}`, {
        cache: 'no-store',
        next: { tags: ['tutor'] },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  getMyTutorProfile: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/tutors/my-profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
        next: { tags: ['my-tutor-profile'] },
      });
      const data = await res.json();
      // console.log('from service-->', data);

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  createTutorProfile: async function (
    tutorCreateProfileData: TutorCreateProfile,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/tutors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorCreateProfileData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: {
            message: 'Error: Profile not created/updated',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  createTutorAvailability: async function (payload: {
    startTime: Date;
    endTime: Date;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/tutors/availability`, {
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
            message: 'Error: Availability not created',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateTutorAvailability: async function (
    id: string,
    payload: {
      startTime: Date;
      endTime: Date;
    },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/tutors/availability/${id}`, {
        method: 'PUT',
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
            message: 'Error: Availability not updated',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },

  updateTutorCategory: async function (payload: string[]) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/tutors/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ categoryIds: payload }),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: {
            message: 'Error: Categories not added',
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong!' } };
    }
  },
};
