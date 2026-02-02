import { createBookingAction } from '@/actions/booking.action';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { tutorService } from '@/services/tutor.service';

export default async function CreateBookingPage() {
  const { data } = await tutorService.getAllTutors({}, { cache: 'no-store' });

  const tutors = data?.data ?? [];

  // const handleCreateBooking = async (id: string) => {
  //   'use server';
  //   // await createBookingAction(id);
  // };

  return (
    <section className="container mx-auto max-w-4xl py-10 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Create Booking</h1>
        <p className="text-muted-foreground">
          Choose a tutor and book an available slot
        </p>
      </header>

      <div className="space-y-6">
        {tutors.map((tutor: any) => (
          <Card key={tutor.id}>
            <CardContent className="p-6 space-y-4">
              {/* Tutor info */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {tutor.name ?? 'Professional Tutor'}
                  </h2>

                  <div className="flex gap-2 mt-2">
                    {tutor.tutorCategories.map((tc: any) => (
                      <Badge key={tc.id} variant="secondary">
                        {tc.category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="font-medium">€{tutor.hourlyRate}/hr</p>
              </div>

              {/* Availability */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {tutor.availabilities
                  .filter((a: any) => !a.isBooked)
                  .map((slot: any) => (
                    <form
                      key={slot.id}
                      action={async () => {
                        'use server';
                        await createBookingAction(slot.id);
                      }}
                    >
                      <Button
                        variant="outline"
                        className="w-full text-left h-auto p-3"
                        type="submit"
                      >
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
                      </Button>
                    </form>
                  ))}
              </div>

              {tutor.availabilities.filter((a: any) => !a.isBooked).length ===
                0 && (
                <p className="text-sm text-muted-foreground">
                  No available slots
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
