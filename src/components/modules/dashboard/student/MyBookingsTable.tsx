import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookingsData } from '@/types/booking.type';
import { BookingStatusCell } from '../shared/BookingStatusCell';
import { User } from 'better-auth';
import { Role } from '@/types/constants.type';
import { BookingStatuses, Roles } from '@/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MyBookingsTable({
  bookings,
  role,
}: {
  bookings: BookingsData[];
  role: Role;
}) {
  if (!bookings.length) {
    return (
      <p className="text-muted-foreground">You don’t have any bookings yet.</p>
    );
  }

  // console.log(bookings);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tutor</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            {role === Roles.student ? (
              <TableHead>Review</TableHead>
            ) : (
              <TableHead>View Booking</TableHead>
            )}
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map(booking => {
            const tutor = booking.tutorProfile;
            const availability = booking.availability;

            return (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {tutor?.name ?? 'Tutor'}
                </TableCell>

                <TableCell className="flex flex-row gap-1 items-center">
                  {tutor?.tutorCategories?.map((ct: any) => (
                    <Badge key={ct?.id} variant="outline">
                      {ct?.category?.name}
                    </Badge>
                  )) ?? '—'}
                </TableCell>

                <TableCell>
                  {new Date(availability.startTime).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {new Date(availability.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {' – '}
                  {new Date(availability.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                {/* status */}
                <TableCell>
                  {/* <Badge
                    variant={
                      booking.status === 'COMPLETED'
                        ? 'secondary'
                        : booking.status === 'CANCELLED'
                          ? 'destructive'
                          : 'default'
                    }
                  >
                    {booking.status}
                  </Badge> */}
                  <BookingStatusCell booking={booking} role={role} />
                </TableCell>

                {role === Roles.student ? (
                  <TableCell>
                    {booking.status === BookingStatuses.completed && (
                      <Badge
                        variant="default"
                        className="text-xs cursor-pointer"
                      >
                        <Link href={`/dashboard/bookings/${booking.id}`}>
                          {booking.review ? 'Review' : 'View'}
                        </Link>
                      </Badge>
                    )}
                  </TableCell>
                ) : (
                  <TableCell>
                    {booking.status === BookingStatuses.completed && (
                      <Badge
                        variant="default"
                        className="text-xs cursor-pointer"
                      >
                        <Link href={`/dashboard/bookings/${booking.id}`}>
                          View
                        </Link>
                      </Badge>
                    )}
                  </TableCell>
                )}

                <TableCell className="text-right">
                  €{tutor?.hourlyRate}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
