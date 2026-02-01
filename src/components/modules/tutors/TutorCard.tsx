import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { TutorProfile } from '@/types/tutor.type';

const TUTOR_IMAGES = [
  '/images/people-1.jpg',
  '/images/people-2.jpg',
  '/images/people-3.jpg',
  '/images/people-4.jpg',
  '/images/people-5.jpg',
  '/images/people-6.jpg',
  '/images/people-7.jpg',
  '/images/people-8.jpg',
  '/images/people-9.jpg',
  '/images/people-10.jpg',
  '/images/people-11.jpg',
];

export function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const tutorImage = TUTOR_IMAGES[parseInt(tutor.id) % TUTOR_IMAGES.length];
  return (
    <Card className="hover:shadow-lg transition ">
      <CardContent className="p-0 space-y-4">
        {/* Image */}
        <div className="relative h-48 w-full rounded-t-md overflow-hidden">
          <Image src={tutorImage} alt="Tutor" fill className="object-cover" />
        </div>
        {/* body */}
        <div className="p-4 space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {tutor.tutorCategories.slice(0, 2).map((tc, i) => (
              <Badge key={i} variant="secondary">
                {tc.category.name}
              </Badge>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tutor.bio || 'Experienced tutor ready to help you learn.'}
          </p>

          {/* Rating & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{tutor?.ratingAvg ?? 'New'}</span>
              {tutor.totalReviews ? (
                <span className="text-muted-foreground">
                  ({tutor.totalReviews})
                </span>
              ) : null}
            </div>

            <span className="font-semibold">
              €{tutor.hourlyRate ?? '--'}/hr
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
