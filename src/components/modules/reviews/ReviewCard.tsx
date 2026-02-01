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

export function ReviewCard({ rating, comment }: ReviewGet) {
  return (
    <Card className="h-full p-6">
      <CardHeader className="">
        <div className="flex items-center text-center mx-auto">
          <Avatar className="h-14 w-14 border-2 border-primary/10">
            <AvatarImage src={undefined} alt={'Testimonial user image'} />
            <AvatarFallback className="bg-primary/10 text-lg font-semibold">
              {'SK'}
            </AvatarFallback>
          </Avatar>
          {/* <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" /> */}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        <p className="text-center text-lg text-muted-foreground">“{comment}”</p>

        {/* Footer */}
        {/* <div className="mt-auto">
          <p className="font-medium">{studentName}</p>
          <p className="text-xs text-muted-foreground">Student • {subject}</p>
        </div> */}
      </CardContent>
    </Card>
  );
}
