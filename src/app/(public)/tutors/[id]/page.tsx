import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Video, MessageCircle } from 'lucide-react';
import { tutorService } from '@/services/tutor.service';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import TutorPageCard from '@/components/modules/tutors/TutorPageCard';

export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await tutorService.getTutorById(id);

  const tutor = data?.data;
  if (!tutor) return null;

  const tutorImage =
    tutor?.user?.image ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${tutor.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  // Fetch related tutors based on the first category
  let relatedTutors = [];
  if (tutor.tutorCategories?.length > 0) {
    const relatedResponse = await tutorService.getAllTutors({ 
      categoryId: tutor.tutorCategories[0].categoryId,
      limit: '4' 
    });
    // Filter out the current tutor
    relatedTutors = (relatedResponse.data?.data || []).filter((t: any) => t.id !== tutor.id).slice(0, 4);
  }

  return (
    <div>
      {/* Hero Cover */}
      <div className="h-64 w-full bg-primary/10 relative">
        <Image 
          src="/images/carousel-3.jpg" 
          alt="Cover" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <section className="container mx-auto px-4 pb-12 max-w-5xl -mt-24 relative z-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg bg-muted text-primary">
              <AvatarImage src={tutorImage} alt="Tutor avatar" className="object-cover" />
              <AvatarFallback className="text-4xl font-bold bg-primary/10">T</AvatarFallback>
            </Avatar>
            <div className="pb-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {tutor.name ?? 'Professional Tutor'}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                {tutor.tutorCategories.map((tc: any) => (
                  <Badge key={tc.id} variant="secondary">
                    {tc.category.name}
                  </Badge>
                ))}

                {tutor.isFeatured && <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">Featured</Badge>}
              </div>
            </div>
          </div>

          <div className="md:text-right pb-2 flex flex-col md:items-end gap-4">
            <div>
              <p className="text-3xl font-bold text-primary">
                €{tutor.hourlyRate}
                <span className="text-base font-normal text-muted-foreground"> / hour</span>
              </p>
              <div className="flex items-center md:justify-end gap-1 mt-1 text-sm font-medium">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                {tutor.ratingAvg ?? 'New'} <span className="text-muted-foreground">({tutor.totalReviews} reviews)</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button asChild>
                <Link href="#availability">Book Session</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            {/* BIO */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">About the tutor</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{tutor.bio}</p>
              </CardContent>
            </Card>

            {/* REVIEWS */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Student Reviews</h2>

              {tutor.reviews.length === 0 && <p className="text-muted-foreground italic">No reviews yet.</p>}

              <div className="space-y-4">
                {tutor.reviews.map((review: any) => (
                  <Card key={review.id} className="bg-muted/30">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 stroke-yellow-400' : 'fill-muted stroke-muted'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-foreground text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* SPECS */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <p className="text-muted-foreground text-sm">{tutor.experienceYears} years of teaching experience</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Teaching Format</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Video className="w-4 h-4" />
                    1-on-1 Online Video Sessions
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AVAILABILITY */}
            <section id="availability">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="flex flex-col gap-3">
                {tutor.availabilities.length === 0 ? (
                  <p className="text-muted-foreground text-sm italic">No upcoming availability.</p>
                ) : (
                  tutor.availabilities.map((slot: any) => (
                    <Card
                      key={slot.id}
                      className={`overflow-hidden transition ${
                        slot.isBooked ? 'opacity-50' : 'hover:border-primary/50'
                      }`}
                    >
                      <Link href={slot.isBooked ? '#' : '/dashboard/create-booking'} className={`block p-4 ${slot.isBooked && 'cursor-default'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-semibold">
                              {new Date(slot.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {' '}–{' '}
                              {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {!slot.isBooked ? (
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Available</Badge>
                          ) : (
                            <Badge variant="secondary">Booked</Badge>
                          )}
                        </div>
                      </Link>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
        
        {/* RELATED TUTORS */}
        {relatedTutors.length > 0 && (
          <section className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-semibold mb-6">Similar Tutors You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTutors.map((t: any, idx: number) => (
                <TutorPageCard key={t.id} tutor={t} idx={idx} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
