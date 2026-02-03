import { bookingService } from '@/services/booking.service';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { BookingStatuses, Roles } from '@/constants';
import { userService } from '@/services/user.service';
import ReviewForm from '@/components/modules/dashboard/student/ReviewForm';

export default async function ViewBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookingPromise = bookingService.getBookingById(id);
  const userPromise = userService.getSession();

  const [bookingData, userData] = await Promise.all([
    bookingPromise,
    userPromise,
  ]);
  const booking = bookingData?.data?.data ?? {};
  const user = userData?.data?.user ?? {};
  console.log(booking);
  //   console.log(user);
  if (!booking) return null;

  const isStudent = user?.role === Roles.student;
  const hasReview = Boolean(booking.review);
  console.log({ isStudent, hasReview });

  return (
    <section className="container mx-auto max-w-3xl py-10 space-y-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Booking Details</h1>

        <div className="flex gap-2">
          <Badge
            className={`${booking.status === BookingStatuses.completed && 'bg-green-400 text-black'}`}
          >
            {booking.status}
          </Badge>
          <Badge variant="secondary">
            {new Date(booking.createdAt).toLocaleDateString()}
          </Badge>
        </div>
      </header>

      <Separator />

      {/* TUTOR INFO */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Tutor</h2>
          <p className="font-medium">{booking.tutorProfile.name}</p>

          <div className="flex flex-wrap gap-2">
            {booking.tutorProfile.tutorCategories.map((tc: any) => (
              <Badge key={tc.id} variant="outline">
                {tc.category.name}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            €{booking.tutorProfile.hourlyRate} / hour ·{' '}
            {booking.tutorProfile.experienceYears} years experience
          </p>
        </CardContent>
      </Card>

      {/* TIME */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Session Time</h2>
          <p className="text-sm">
            {new Date(booking.availability.startTime).toLocaleString()} –{' '}
            {new Date(booking.availability.endTime).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      {/* REVIEW SECTION */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Review</h2>

          {hasReview && (
            <>
              <p className="font-medium">Rating: {booking.review.rating} ⭐</p>
              <p className="text-muted-foreground">{booking.review.comment}</p>
            </>
          )}

          {isStudent && !hasReview && <ReviewForm bookingId={booking.id} />}

          {!isStudent && !hasReview && (
            <p className="text-sm text-muted-foreground">
              Student has not submitted a review yet.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
