'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import Link from 'next/link';

const HERO_IMAGES = [
  '/images/carousel-1.jpg',
  '/images/carousel-2.jpg',
  '/images/carousel-3.jpg',
  '/images/carousel-4.jpg',
  '/images/carousel-5.jpg',
];

export function HomeHero() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnMouseEnter: true }));
  return (
    <section className="relative h-[80vh] w-full overflow-hidden rounded-md">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="h-full w-full"
      >
        <CarouselContent>
          {HERO_IMAGES.map((src, index) => (
            <CarouselItem key={index} className="relative h-[80vh]">
              <Image
                src={src}
                alt="Learning with expert tutors"
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Text content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
          Learn from Expert Tutors, Anytime Anywhere
        </h1>

        <p className="mt-4 text-lg md:text-xl max-w-xl text-white/90">
          Book personalised sessions with verified tutors across multiple
          subjects.
        </p>

        <div className="mt-8 flex gap-4">
          <Button size="lg">
            <Link href="/tutors">Find Tutors</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-slate-950 dark:text-white"
          >
            <Link href="/register">Become a Tutor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
