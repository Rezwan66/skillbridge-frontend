'use client';
import { createBookingAction } from '@/actions/booking.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

export default function CreateBookingButton({ slot }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleCreateBooking = () => {
    // toast.success('clicked', slot.id);
    // console.log({ clicked: slot.id });
    startTransition(async () => {
      try {
        Swal.fire({
          title: 'Confirm booking?',
          // text: "Do you want to book!",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Book now',
        }).then(async result => {
          if (result.isConfirmed) {
            await createBookingAction(slot.id);
            Swal.fire({
              title: 'Booked!',
              text: 'Your slot has been booked',
              icon: 'success',
            });
            router.push('/dashboard/bookings');
          }
        });
      } catch (error) {
        toast.error('Booking failed!');
      }
    });
  };
  return (
    <Button
      variant="outline"
      className="w-full text-left h-auto p-3"
      onClick={handleCreateBooking}
    >
      <div>
        <p className="text-sm font-medium">
          {new Date(slot.startTime).toLocaleDateString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(slot.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          –
          {new Date(slot.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </Button>
  );
}
