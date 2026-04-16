import { Card, CardContent } from '@/components/ui/card';
import { TUTOR_IMAGES } from '@/data/tutorImagePaths';
import { TutorProfile } from '@/types/tutor.type';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TutorPageCard({
  tutor,
  idx,
}: {
  tutor: TutorProfile;
  idx: number;
}) {
  const tutorImage = tutor.user?.image || `https://api.dicebear.com/9.x/notionists/svg?seed=${tutor.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  return (
    <Card className="hover:shadow-md transition cursor-pointer h-full">
      <Link href={`/tutors/${tutor.id}`} className="h-full block">
        <CardContent className="p-4 flex flex-col h-full space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 min-h-14">
            <Image
              src={tutorImage}
              alt="Tutor"
              width={48}
              height={48}
              className="rounded-full shrink-0"
            />
            <div>
              <p className="font-medium">{tutor?.name ?? 'Tutor'}</p>
              <p className="text-xs text-muted-foreground">
                {tutor.experienceYears} years experience
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm line-clamp-2 min-h-10">{tutor.bio}</p>

          {/* Subjects */}
          <div className="flex flex-wrap gap-2 min-h-8">
            {tutor.tutorCategories.map((tc: any) => (
              <span key={tc.id} className="rounded bg-muted px-2 py-2 text-xs">
                {tc.category.name}
              </span>
            ))}
          </div>

          {/* Footer — ALWAYS at bottom */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span className="text-sm">{tutor.ratingAvg ?? 'New'}</span>
            </div>

            <p className="font-semibold">€{tutor.hourlyRate}/hr</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
