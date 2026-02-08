import { TutorProfile } from '@/types/tutor.type';
import TutorFilters from './TutorFilters';
import TutorsGrid from './TutorsGrid';
import { Category } from '@/types/category.type';
import { Suspense } from 'react';

export default function TutorsPageLayout({
  tutors,
  categories,
}: {
  tutors: TutorProfile[];
  categories: Category[];
}) {
  // console.log(tutors);

  return (
    <div className="container py-10 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Find Your Tutor</h1>
        <p className="text-muted-foreground">
          {/* {tutors?.length} tutors available */}
          Available Tutors
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
        <Suspense fallback={<div>Loading filters...</div>}>
          <TutorFilters categories={categories} />
        </Suspense>
        <TutorsGrid tutors={tutors} />
      </div>
    </div>
  );
}
