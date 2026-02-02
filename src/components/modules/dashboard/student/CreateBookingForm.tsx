'use client';
import { createBookingAction } from '@/actions/booking.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

interface SlotType {
  id: string;
  isBooked: boolean;
  startTime: Date;
  endTime: Date;
  tutorProfileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function CreateBookingForm({ slot }: { slot: SlotType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleCreateBooking = () => {
    // toast.success('clicked');
    // console.log({ clicked: slot });
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
            const res = await createBookingAction(slot.id);
            if (res.success) {
              Swal.fire({
                title: 'Booked!',
                text: 'Your slot has been booked',
                icon: 'success',
              });
              router.push('/dashboard/bookings');
            }
          }
        });
      } catch (error) {
        toast.error('Booking failed!');
      }
    });
  };
  return (
    <form action={handleCreateBooking}>
      <Button
        variant="outline"
        disabled={isPending}
        className="w-full text-left h-auto p-3"
        type="submit"
      >
        {isPending ? (
          <span>Booking...</span>
        ) : (
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
        )}
      </Button>
    </form>
  );
}
