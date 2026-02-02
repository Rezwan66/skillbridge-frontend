import BookingSuccessToast from '@/components/modules/dashboard/student/BookingSuccessToast';
import MyBookingsTable from '@/components/modules/dashboard/student/MyBookingsTable';
import { bookingService } from '@/services/booking.service';
import { toast } from 'sonner';

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  // const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const resolved = await searchParams;
  // if (resolved.success) {
  //   console.log(resolved.success);
  //   toast.success('Booking confirmed 🎉');
  // }

  const { data } = await bookingService.getMyBookings({ cache: 'no-store' });
  const bookings = data?.data ?? [];
  return (
    <section className="space-y-6">
      <BookingSuccessToast success={resolved.success} />

      <header>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your booked sessions
        </p>
      </header>

      <MyBookingsTable bookings={bookings} />
    </section>
  );
}
