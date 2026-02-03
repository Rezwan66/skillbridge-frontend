'use server';

import { reviewService } from '@/services/review.service';
import { updateTag } from 'next/cache';

export async function createReviewAction(payload: {
  bookingId: string;
  rating: number;
  comment?: string;
}) {
  const res = await reviewService.createReview(payload);
  updateTag('booking');
  return res;
}
