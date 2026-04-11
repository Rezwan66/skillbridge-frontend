import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { TutorProfile } from '@/types/tutor.type';
import { TUTOR_IMAGES } from '@/data/tutorImagePaths';
import Link from 'next/link';

export function TutorCard({
  tutor,
  idx,
}: {
  tutor: TutorProfile;
  idx: number;
}) {
  const tutorImage = tutor.user?.image || 'https://github.com/shadcn.png';
  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-border/50">
      <Link href={`/tutors/${tutor.id}`}>
        <CardContent className="p-0 space-y-4">
          {/* Image */}
          <div className="relative h-48 w-full rounded-t-md overflow-hidden">
            <Image src={tutorImage} alt="Tutor" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
          </div>
          {/* body */}
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">{tutor.name ?? 'Tutor'}</h3>
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
      </Link>
    </Card>
  );
}
