'use client';

import { TutorProfile } from '@/types/tutor.type';
import TutorFilters from './TutorFilters';
import TutorsGrid from './TutorsGrid';
import { Category } from '@/types/category.type';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TutorsPageLayout({
  tutors,
  categories,
}: {
  tutors: TutorProfile[];
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const updateSort = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', val);
    router.push(`?${params.toString()}`);
  };

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container py-10 min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Your Tutor</h1>
          <p className="text-muted-foreground mt-1">
            Available Tutors
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Select onValueChange={updateSort} defaultValue={searchParams.get('sort') || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="price-asc">Lowest Price</SelectItem>
              <SelectItem value="price-desc">Highest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
        <div className="md:sticky md:top-24 md:self-start z-10">
          <Suspense fallback={<div>Loading filters...</div>}>
            <TutorFilters categories={categories} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-8">
          <TutorsGrid tutors={tutors} />
          
          {/* Pagination Controls */}
          {tutors.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm font-medium">Page {currentPage}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(currentPage + 1)}
                disabled={tutors.length < 10} // Assuming 10 items per page limit
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
