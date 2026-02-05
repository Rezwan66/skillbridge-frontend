// 'use client';

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { FieldGroup, FieldSet } from '@/components/ui/field';

export default function AddEditDisplay({
  date,
  setDate,
  start,
  setStart,
  end,
  setEnd,
}: {
  date: Date;
  setDate: (date: Date) => void;
  start: string;
  setStart: (start: string) => void;
  end: string;
  setEnd: (end: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* calendar */}
      <FieldGroup>
        <Calendar
          mode="single"
          required={true}
          selected={date}
          onSelect={setDate}
        />
      </FieldGroup>
      {/* times */}
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
    </div>
  );
}
