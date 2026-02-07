'use server';

import { adminService } from '@/services/admin.service';
import { tutorService } from '@/services/tutor.service';
import { UserStatus } from '@/types/constants.type';
import { updateTag } from 'next/cache';

export interface CreateTutorProfileType {
  name: string;
  bio: string;
  hourlyRate: number;
  experienceYears: number;
}

export async function updateUserStatusAction(
  id: string,
  payload: { status: UserStatus },
) {
  const res = await adminService.updateUserStatus(id, payload);
  updateTag('allUsers');
  return res;
}

export async function updateTutorFeaturedStatusAction(
  id: string,
  payload: { isFeatured: boolean },
) {
  const res = await adminService.updateTutorFeaturedStatus(id, payload);
  updateTag('tutors');
  return res;
}
