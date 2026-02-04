'use server';

import { userService } from '@/services/user.service';
import { updateTag } from 'next/cache';

export async function updateMyProfileAction(payload: {
  name: string;
  image: string;
}) {
  const res = await userService.updateMyProfile(payload);
  updateTag('user');
  return res;
}
