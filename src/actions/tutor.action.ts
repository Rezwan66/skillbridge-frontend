'use server';

import { tutorService } from '@/services/tutor.service';
import { updateTag } from 'next/cache';

// export const getAllTutors = async (params: any, config: any) => {
//   return await tutorService.getAllTutors(params, config);
// };

export interface CreateTutorProfileType {
  name: string;
  bio: string;
  hourlyRate: number;
  experienceYears: number;
}

export async function createTutorProfileAction(
  payload: CreateTutorProfileType,
) {
  const res = await tutorService.createTutorProfile(payload);
  updateTag('my-tutor-profile');
  return res;
}

export async function updateTutorCategoriesAction(payload: string[]) {
  const res = await tutorService.updateTutorCategory(payload);
  updateTag('my-tutor-profile');
  return res;
}

export async function createTutorAvailabilityAction(payload: {
  startTime: Date;
  endTime: Date;
}) {
  const res = await tutorService.createTutorAvailability(payload);
  updateTag('my-tutor-profile');
  return res;
}

export async function updateTutorAvailabilityAction(
  id: string,
  payload: {
    startTime: Date;
    endTime: Date;
  },
) {
  const res = await tutorService.updateTutorAvailability(id, payload);
  updateTag('my-tutor-profile');
  return res;
}
