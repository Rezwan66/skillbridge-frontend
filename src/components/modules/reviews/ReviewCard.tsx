// src/components/home/ReviewCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

type ReviewCardProps = {
  rating: number;
  comment: string;
  studentName: string;
  subject: string;
};

export function ReviewCard({
  rating,
  comment,
  studentName,
  subject,
}: ReviewCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Stars */}
        <div className="flex gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-yellow-500' : 'fill-muted stroke-muted'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm text-muted-foreground">“{comment}”</p>

        {/* Footer */}
        <div className="mt-auto">
          <p className="font-medium">{studentName}</p>
          <p className="text-xs text-muted-foreground">Student • {subject}</p>
        </div>
      </CardContent>
    </Card>
  );
}
