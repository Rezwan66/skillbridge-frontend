'use client';

import { updateBookingStatusAction } from '@/actions/booking.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BookingStatuses, Roles } from '@/constants';
import { BookingStatus, Role } from '@/types/constants.type';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

type Props = {
  booking: any;
  role: Role;
};

export function BookingStatusCell({ booking, role }: Props) {
  const canCancel =
    role === Roles.student && booking.status === BookingStatuses.confirmed;

  const canComplete =
    role === Roles.tutor && booking.status === BookingStatuses.confirmed;

  // console.log(canCancel);

  async function handleUpdate(status: BookingStatus) {
    Swal.fire({
      title: `Wait ✋🏼`,
      text: `Do you want to change status?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await updateBookingStatusAction(booking.id);
        // console.log(res);
        if (res.success) {
          Swal.fire({
            title: 'Done',
            text: `Your booking has been ${status.toLocaleLowerCase()}`,
            icon: 'success',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.error,
          });
        }
      }
    });
  }

  return (
    <div className="flex gap-2 items-center">
      <Badge
        className={`${booking.status === 'COMPLETED' && 'bg-green-400'}`}
        variant={
          booking.status === 'COMPLETED'
            ? 'secondary'
            : booking.status === 'CANCELLED'
              ? 'destructive'
              : 'default'
        }
      >
        {booking.status}
      </Badge>

      {canCancel && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-xs"
              variant="outline"
              onClick={() => handleUpdate(BookingStatuses.cancelled)}
              className="text-xs text-red-500 "
            >
              ❌
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Cancel Booking</p>
          </TooltipContent>
        </Tooltip>
      )}

      {canComplete && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => handleUpdate(BookingStatuses.completed)}
              className="text-xs text-green-600 "
            >
              ✅
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Complete Booking</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
