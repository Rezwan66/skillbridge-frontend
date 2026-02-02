'use server';

import { bookingService } from '@/services/booking.service';
import { revalidatePath } from 'next/cache';
import { revalidateTag, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBookingAction(availabilityId: string) {
  const { data, error } = await bookingService.createBooking({
    availabilityId,
  });

  if (error) {
    return { success: false };
  }
  //   updateTag('bookings');
  //   updateTag('availabilities');
  revalidateTag('bookings', 'max');
  revalidateTag('availabilities', 'max');

  // redirect('/dashboard/bookings?success=1');

  return { success: true };
}

export async function updateBookingStatusAction(bookingId: string) {
  const { data, error } = await bookingService.updateBookingStatus(bookingId);
  console.log({ data, error });

  if (data?.error) {
    return { success: false, error: data.error };
  }

  revalidatePath('/dashboard/bookings');
  return { success: true, data };
}
