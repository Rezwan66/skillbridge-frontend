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

export default function MyBookingsTable({
  bookings,
}: {
  bookings: BookingsData[];
}) {
  if (!bookings.length) {
    return (
      <p className="text-muted-foreground">You don’t have any bookings yet.</p>
    );
  }

  console.log(bookings);

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

                <TableCell>
                  <Badge
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
                </TableCell>

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
