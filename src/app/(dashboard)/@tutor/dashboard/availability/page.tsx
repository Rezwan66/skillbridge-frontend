import TutorAvailabilityManager from '@/components/modules/dashboard/tutor/TutorAvailabilityManager';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { tutorService } from '@/services/tutor.service';

export default async function AvailabilityPage() {
  const { data } = await tutorService.getMyTutorProfile();
  // console.log(data?.data);
  const tutorProfile = data?.data ?? {};
  const availabilities = tutorProfile?.availabilities ?? [];
  // console.log(availabilities.length);
  return (
    <section className="container mx-auto max-w-4xl py-6 space-y-4">
      <header>
        <h1 className="text-3xl font-bold">Availability</h1>
        <p className="text-muted-foreground">
          Add time slots when students can book you
        </p>
      </header>

      {/* <Separator /> */}

      <Card>
        <CardContent className="p-6">
          {/* <p>Availabilities: {availabilities.length}</p> */}
          <TutorAvailabilityManager availabilities={availabilities} />
        </CardContent>
      </Card>
    </section>
  );
}
