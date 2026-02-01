import { Card, CardContent } from '@/components/ui/card';
import { TutorProfile } from '@/types/tutor.type';
import { Star } from 'lucide-react';
import Image from 'next/image';

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

export default function TutorPageCard({
  tutor,
  idx,
}: {
  tutor: TutorProfile;
  idx: number;
}) {
  const tutorImage = TUTOR_IMAGES[idx % TUTOR_IMAGES.length];
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Image
            src={tutorImage}
            alt="Tutor"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">Tutor</p>
            <p className="text-xs text-muted-foreground">
              {tutor.experienceYears} years experience
            </p>
          </div>
        </div>

        <p className="text-sm line-clamp-2">{tutor.bio}</p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-2">
          {tutor.tutorCategories.map((tc: any) => (
            <span key={tc.id} className="rounded bg-muted px-2 py-1 text-xs">
              {tc.category.name}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500" />
            <span className="text-sm">{tutor.ratingAvg ?? 'New'}</span>
          </div>

          <p className="font-semibold">€{tutor.hourlyRate}/hr</p>
        </div>
      </CardContent>
    </Card>
  );
}
