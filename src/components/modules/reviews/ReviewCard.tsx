// src/components/home/ReviewCard.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReviewGet } from '@/types/review.type';
import { Star } from 'lucide-react';

// type ReviewCardProps = {
//   rating: number;
//   comment: string;
//   studentName: string;
//   subject: string;
// };

export function ReviewCard({ rating, comment, studentId }: ReviewGet) {
  // Deterministic avatar URL using DiceBear (each studentId generates the EXACT same beautiful graphic)
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${studentId}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <Card className="h-full p-6 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center mx-auto">
          <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm bg-muted">
            <AvatarImage src={avatarUrl} alt="Student avatar" />
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              ST
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        {/* Stars */}
        <div className="flex justify-center gap-1 text-yellow-500">
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
        <p className="text-center text-lg text-muted-foreground italic flex-grow">
          "{comment}"
        </p>

        {/* Footer */}
        <div className="mt-4 text-center border-t pt-4">
          <p className="font-semibold text-primary">Anonymous Student</p>
          <p className="text-xs text-muted-foreground mt-1">Verified Booking</p>
        </div>
      </CardContent>
    </Card>
  );
}
