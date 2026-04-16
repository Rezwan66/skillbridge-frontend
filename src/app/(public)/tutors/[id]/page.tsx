import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { tutorService } from '@/services/tutor.service';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await tutorService.getTutorById(id);

  const tutor = data?.data;
  if (!tutor) return null;

  const tutorImage =
    tutor?.user?.image ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${tutor.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-sm bg-muted text-primary">
            <AvatarImage src={tutorImage} alt="Tutor avatar" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10">T</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {tutor.name ?? 'Professional Tutor'}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {tutor.tutorCategories.map((tc: any) => (
                <Badge key={tc.id} variant="secondary">
                  {tc.category.name}
                </Badge>
              ))}

              {tutor.isFeatured && <Badge variant="outline">Featured</Badge>}
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">
            €{tutor.hourlyRate}
            <span className="text-sm text-muted-foreground"> / hour</span>
          </p>

          <div className="flex items-center justify-end gap-1 mt-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            {tutor.ratingAvg} ({tutor.totalReviews} reviews)
          </div>
        </div>
      </header>

      <Separator className="mb-10" />

      {/* BIO */}
      <Card className="mb-10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">About the tutor</h2>
          <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-medium">{tutor.experienceYears}</span> years experience
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AVAILABILITY */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold ">Availability</h2>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">Click to book</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tutor.availabilities.map((slot: any) => (
            <Card
              key={slot.id}
              className={`p-4 ${
                slot.isBooked ? 'opacity-50 line-through' : 'hover:shadow-md transition'
              }`}
            >
              <Link href={'/dashboard/create-booking'}>
                <p className="text-sm font-medium">
                  {new Date(slot.startTime).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(slot.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  –{' '}
                  {new Date(slot.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {!slot.isBooked && <Badge className="mt-2 w-fit">Available</Badge>}
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Student reviews</h2>

        {tutor.reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}

        <div className="space-y-4">
          {tutor.reviews.map((review: any) => (
            <Card key={review.id}>
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="font-medium">{review.rating}</span>
                </div>

                <p className="text-muted-foreground">{review.comment}</p>

                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
