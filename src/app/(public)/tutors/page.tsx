import TutorsPageLayout from '@/components/modules/tutors/TutorsPageLayout';
import { categoryService } from '@/services/category.service';
import { tutorService } from '@/services/tutor.service';
import { TutorSearchParams } from '@/types/tutor.type';

type PageProps = {
  searchParams: TutorSearchParams;
};

export default async function TutorsPage({ searchParams }: PageProps) {
  // const params = { ...(await searchParams) };
  // const queries = await searchParams;
  const resolvedParams = await searchParams;

  const params = {
    search: resolvedParams.search,
    categoryId: resolvedParams.categoryId,
    minRating: resolvedParams.minRating ? resolvedParams.minRating : undefined,
    maxPrice: resolvedParams.maxPrice ? resolvedParams.maxPrice : undefined,
  };
  const tutorsPromise = tutorService.getAllTutors(params, {
    cache: 'no-store',
  });
  const categoriesPromise = categoryService.getAllCategories({
    cache: 'no-store',
  });

  const [tutors, categories] = await Promise.all([
    tutorsPromise,
    categoriesPromise,
  ]);

  // console.log(categories);

  return (
    <div>
      <TutorsPageLayout
        tutors={tutors?.data?.data ?? []}
        categories={categories?.data.data ?? []}
      />
    </div>
  );
}
