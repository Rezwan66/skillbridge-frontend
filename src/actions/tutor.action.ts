'use server';

import { tutorService } from '@/services/tutor.service';

export const getAllTutors = async (params: any, config: any) => {
  return await tutorService.getAllTutors(params, config);
};
