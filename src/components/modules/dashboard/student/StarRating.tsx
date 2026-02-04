'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

type RatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({ value, onChange }: RatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={cn(
            'h-6 w-6 cursor-pointer transition',
            star <= value
              ? 'fill-yellow-400 stroke-yellow-400'
              : 'stroke-muted-foreground',
          )}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
}
