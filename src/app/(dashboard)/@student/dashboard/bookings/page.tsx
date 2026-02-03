import MyBookingsTable from '@/components/modules/dashboard/student/MyBookingsTable';
import { bookingService } from '@/services/booking.service';
import { userService } from '@/services/user.service';

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  // const searchParams: ReadonlyURLSearchParams = useSearchParams();
  // const resolved = await searchParams;
  // if (resolved.success) {
  //   console.log(resolved.success);
  //   toast.success('Booking confirmed 🎉');
  // }

  const bookingPromise = await bookingService.getMyBookings({
    cache: 'no-store',
  });
  const userPromise = await userService.getSession();

  const [bookingData, userData] = await Promise.all([
    bookingPromise,
    userPromise,
  ]);
  const bookings = bookingData?.data?.data ?? [];
  const user = userData?.data?.user ?? {};
  // console.log(bookings);
  // console.log(user);
  return (
    <section className="space-y-6">
      {/* <BookingSuccessToast success={resolved.success} /> */}

      <header>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your booked sessions
        </p>
      </header>

      <MyBookingsTable bookings={bookings} role={user?.role} />
    </section>
  );
}
