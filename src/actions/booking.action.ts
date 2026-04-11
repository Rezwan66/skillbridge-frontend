'use server';

import { bookingService } from '@/services/booking.service';
import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';
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
  revalidateTag('bookings','max');
  revalidateTag('availabilities','max');

  // redirect('/dashboard/bookings?success=1');

  return { success: true };
}

export async function updateBookingStatusAction(bookingId: string) {
  const { data, error } = await bookingService.updateBookingStatus(bookingId);
  // console.log({ data, error });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/bookings');
  revalidateTag('bookings', 'max');
  revalidateTag('availabilities', 'max');
  return { success: true, data };
}

export async function initiatePaymentAction(bookingId: string) {
  const { data, error } = await bookingService.initiatePayment(bookingId);

  if (error || !data) {
    return { success: false, error: error?.message || 'Payment initiation failed' };
  }

  return { success: true, url: data.data.paymentUrl };
}
