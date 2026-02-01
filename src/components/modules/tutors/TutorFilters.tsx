'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const categories = [
  { id: '1', name: 'Bengali' },
  { id: '2', name: 'Biology' },
  { id: '3', name: 'Chemistry' },
  { id: '4', name: 'Deutsch' },
  { id: '5', name: 'Geography' },
  { id: '6', name: 'Mathematics' },
  { id: '7', name: 'Physics' },
];

export default function TutorFilters() {
  const [price, setPrice] = useState(50);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    router.push(`/tutors?${newParams.toString()}`);
  };

  return (
    <aside className="space-y-8">
      <h3 className="font-semibold">Filters</h3>
      {/* searchbar */}
      <Input
        placeholder="Search tutors..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onBlur={e => updateParam('search', e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            updateParam('search', searchValue);
          }
        }}
      />

      {/* rating */}
      <div>
        <p className="mb-2 text-sm font-medium">Minimum Rating</p>
        <div className="flex gap-2">
          {[5, 4, 3].map(r => (
            <Button
              key={r}
              size="sm"
              variant="outline"
              onClick={() => updateParam('minRating', r.toString())}
            >
              {r}★ & up
            </Button>
          ))}
        </div>
      </div>

      {/* price */}
      <div>
        <p className="mb-2 text-sm font-medium">Hourly Rate (€)</p>
        <Slider
          defaultValue={[price]}
          max={200}
          step={10}
          onValueChange={val => setPrice(val[0])}
          onValueCommit={val => updateParam('maxPrice', val[0].toString())}
        />
        <p className="text-sm text-muted-foreground">€{price}/ hour</p>
      </div>

      {/* category */}
      <div>
        <p className="mb-2 text-sm font-medium">By Subject</p>
        <Select onValueChange={value => updateParam('categoryId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
