import { Card, CardContent } from '@/components/ui/card';
import { TutorProfile } from '@/types/tutor.type';
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TutorPageCard({
  tutor,
  idx,
}: {
  tutor: TutorProfile;
  idx: number;
}) {
  const tutorImage = tutor.user?.image || `https://api.dicebear.com/9.x/notionists/svg?seed=${tutor.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  
  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden border-border/50 group">
      {/* Image Cover */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
        <Image
          src={tutorImage}
          alt={tutor.name || 'Tutor'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold shadow-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{tutor.ratingAvg ?? 'New'}</span>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{tutor?.name ?? 'Expert Tutor'}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
            <MapPin className="h-3 w-3" />
            <span>Online • {tutor.experienceYears} yrs exp</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-10 mb-4">
          {tutor.bio || 'Experienced tutor ready to help you achieve your goals and excel in your studies.'}
        </p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tutor.tutorCategories?.slice(0, 3).map((tc: any) => (
            <Badge key={tc.id} variant="secondary" className="font-normal text-xs">
              {tc.category.name}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground block">Rate</span>
            <span className="font-bold text-foreground">€{tutor.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
          </div>
          <Button asChild size="sm" className="rounded-full">
            <Link href={`/tutors/${tutor.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
