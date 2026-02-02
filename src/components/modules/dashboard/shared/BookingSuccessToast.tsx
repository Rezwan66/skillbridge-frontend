'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function BookingSuccessToast({ success }: { success?: string }) {
  const router = useRouter();
  useEffect(() => {
    if (success) {
      toast.success('Booking confirmed 🎉');
      router.replace('/dashboard/bookings');
    }
  }, [success]);

  return null;
}
