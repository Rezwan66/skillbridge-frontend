'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// import { testimonials } from '@/data/testimonials';
import { ReviewCard } from '../reviews/ReviewCard';
import Autoplay from 'embla-carousel-autoplay';
import { ReviewGet } from '@/types/review.type';

export function TestimonialsSection({ reviews }: { reviews: ReviewGet[] }) {
  return (
    <section className="container py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">What our students say</h2>
        <p className="mt-2 text-muted-foreground">
          Real feedback from students who learned with our tutors
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
        className="mx-auto max-w-5xl"
      >
        <CarouselContent>
          {reviews.map(review => (
            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
              <ReviewCard {...review} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
