'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  createTutorAvailabilityAction,
  updateTutorAvailabilityAction,
} from '@/actions/tutor.action';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { SquarePen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddEditDisplay from './AddEditDisplay';

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export default function TutorAvailabilityManager({
  availabilities = [],
}: {
  availabilities?: Availability[];
}) {
  const [date, setDate] = useState<Date>();
  const [start, setStart] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString().slice(0, 5); // "HH:mm"
  });
  const [end, setEnd] = useState('');
  const [isPending, startTransition] = useTransition();

  //   console.log(availabilities);

  const createAvailability = () => {
    if (!date || !start || !end) {
      toast.error('Select date and time');
      return;
    }
    const [sh, sm] = start.split(':');
    const [eh, em] = end.split(':');

    // const startTime = new Date(
    //   Date.UTC(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     +sh,
    //     +sm,
    //     0,
    //   ),
    // );
    // const endTime = new Date(
    //   Date.UTC(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     +eh,
    //     +em,
    //     0,
    //   ),
    // );

    // Create dates in LOCAL timezone (not UTC)
    const startTime = new Date(date);
    startTime.setHours(+sh, +sm, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(+eh, +em, 0, 0);

    // startTime.setHours(+sh, +sm);
    // endTime.setHours(+eh, +em);

    // console.log({ startTime, endTime });

    startTransition(async () => {
      try {
        const res = await createTutorAvailabilityAction({
          startTime,
          endTime,
        });

        if (res?.error) {
          toast.error(res.error.message);
          return;
        }

        toast.success('Availability added');
      } catch (error: any) {
        toast.error(error);
      }
    });
  };

  const updateAvailability = (id: string) => {
    if (!date || !start || !end) {
      return toast.error('Please set the correct date and times');
    }
    // console.log(id);
    const [sh, sm] = start.split(':');
    const [eh, em] = end.split(':');
    // const startTime = new Date(date);
    // const endTime = new Date(date);

    // Use UTC to avoid timezone issues
    // const startTime = new Date(
    //   Date.UTC(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     +sh,
    //     +sm,
    //     0,
    //   ),
    // );
    // const endTime = new Date(
    //   Date.UTC(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     +eh,
    //     +em,
    //     0,
    //   ),
    // );

    // Create dates in LOCAL timezone (not UTC)
    const startTime = new Date(date);
    startTime.setHours(+sh, +sm, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(+eh, +em, 0, 0);

    // startTime.setHours(+sh, +sm);
    // endTime.setHours(+eh, +em);

    startTransition(async () => {
      try {
        const res = await updateTutorAvailabilityAction(id, {
          startTime,
          endTime,
        });

        if (res?.error) {
          toast.error(res.error.message);
          return;
        }
      } catch (error: any) {
        toast.error(error);
      }

      toast.success('Availability updated');
    });
  };

  return (
    <div className="space-y-8">
      {/* Add / Edit Slot */}
      <div>
        {/* <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        
          <FieldGroup>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </FieldGroup>
        
          <FieldGroup className="space-y-4">
            <FieldSet>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={start}
                onChange={e => setStart(e.target.value)}
              />
            </FieldSet>
            <FieldSet>
              <Label>End Time</Label>
              <Input
                type="time"
                value={end}
                onChange={e => setEnd(e.target.value)}
              />
            </FieldSet>
          </FieldGroup>
        </div> */}
        <AddEditDisplay
          date={date as Date}
          setDate={setDate}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
        <Button
          className="w-full mt-8"
          onClick={createAvailability}
          disabled={isPending}
        >
          Add Availability
        </Button>
      </div>

      {/* Existing Slots */}
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Availabilities: {availabilities.length}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availabilities.map(slot => (
            <div
              key={slot.id}
              className="flex items-center justify-between rounded-md border p-4 gap-4"
            >
              <div className="text-sm">
                {/* {new Date(slot.startTime).toLocaleString()} –{' '}
                {new Date(slot.endTime).toLocaleTimeString()} */}
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    📅 Date:{' '}
                    {new Date(slot.startTime).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    🕐 Start:{' '}
                    {new Date(slot.startTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    🕑 End:{' '}
                    {new Date(slot.endTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {!slot.isBooked && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon-sm" variant="secondary">
                      <SquarePen />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Edit availability
                      </DialogTitle>
                      <DialogDescription className="text-center" asChild>
                        <div className="space-y-1 py-2">
                          <p className="text-sm font-medium">Current slot:</p>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                              📅 Date:{' '}
                              {new Date(slot.startTime).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )}
                            </p>
                            <p>
                              🕐 Start:{' '}
                              {new Date(slot.startTime).toLocaleTimeString(
                                'en-US',
                                { hour: '2-digit', minute: '2-digit' },
                              )}
                            </p>
                            <p>
                              🕑 End:{' '}
                              {new Date(slot.endTime).toLocaleTimeString(
                                'en-US',
                                { hour: '2-digit', minute: '2-digit' },
                              )}
                            </p>
                          </div>
                        </div>
                      </DialogDescription>
                      <DialogDescription asChild>
                        <AddEditDisplay
                          date={date as Date}
                          setDate={setDate}
                          start={start}
                          setStart={setStart}
                          end={end}
                          setEnd={setEnd}
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        size="sm"
                        variant="default"
                        className="w-full"
                        onClick={() => updateAvailability(slot.id)}
                      >
                        Edit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
