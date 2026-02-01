import { env } from '@/env';
import { FetchOptions } from '@/types/data-fetch.type';
import { TutorSearchParams } from '@/types/tutor.type';

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
};
