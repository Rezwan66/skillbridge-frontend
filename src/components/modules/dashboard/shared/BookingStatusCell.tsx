'use client';

import { updateBookingStatusAction, initiatePaymentAction } from '@/actions/booking.action';
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

  // const canPay = role === Roles.student && booking.paymentStatus === 'UNPAID' && booking.status !== BookingStatuses.cancelled;
  const canPay=true;

  // console.log(booking.paymentStatus); // undefined here

  async function handlePayment() {
    // --- APPROACH 1: TOAST SYSTEM (Commented out for you to try) ---
    /*
    toast.loading('Initiating Payment Checkout...');
    const res = await initiatePaymentAction(booking.id);
    toast.dismiss();
    
    if (res.success && res.url) {
      toast.success('Redirecting to Stripe... 🚀');
      window.location.href = res.url;
    } else {
      toast.error(res.error || 'Failed to initiate payment');
    }
    */

    // --- APPROACH 2: MODAL SYSTEM (Currently Active) ---
    Swal.fire({
      title: 'Preparing Checkout',
      text: 'Redirecting you to our secure Stripe gateway...',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const res = await initiatePaymentAction(booking.id);
        
        if (res.success && res.url) {
          Swal.update({
            icon: 'success',
            title: 'Redirecting...',
            text: 'Hold tight!',
            showConfirmButton: false
          });
          window.location.href = res.url;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: res.error || 'Failed to initiate payment',
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

      {canPay && (
        <Tooltip>
          <TooltipTrigger asChild>
             <Button
                variant='default'
                onClick={handlePayment}
                className="text-xs h-6 py-1 px-3 ml-2"
             >
                💳 Pay Now
             </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Pay securely via Stripe</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
