'use client';

import Link from 'next/link';

import { Card } from '@/components/ui/card';
import CategoryCard from '../categories/CategoryCard';

type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export default function CategoriesMarquee({
  categories,
}: {
  categories: Category[];
}) {
  // console.log(categories);
  const activeCategories = categories.filter(cat => cat.isActive === true);
  return (
    <section className="py-16  overflow-hidden">
      <div className="container mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Explore Subjects 📚
        </h2>
        <p className="text-muted-foreground mt-2">
          Find tutors by your favourite subjects
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...activeCategories, ...activeCategories].map((category, index) => (
            <Link
              key={`${category.id}-${index}`}
              href={`/tutors?categoryId=${encodeURIComponent(category.id)}`}
            >
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
