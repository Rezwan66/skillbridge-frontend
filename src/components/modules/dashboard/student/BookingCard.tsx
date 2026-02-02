import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingCard({ booking }: { booking: any }) {
  const { tutorProfile, availability, status } = booking;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{tutorProfile?.name ?? 'Tutor'}</h3>

          <Badge variant={status === 'COMPLETED' ? 'secondary' : 'default'}>
            {status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          {new Date(availability.startTime).toLocaleString()} –{' '}
          {new Date(availability.endTime).toLocaleTimeString()}
        </p>

        <p className="text-sm">€{tutorProfile?.hourlyRate}/hour</p>
      </CardContent>
    </Card>
  );
}
