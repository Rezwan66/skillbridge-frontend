import TutorsPageLayout from '@/components/modules/tutors/TutorsPageLayout';
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
  const { data } = await tutorService.getAllTutors(params, {
    cache: 'no-store',
  });
  // console.log(data);

  return (
    <div>
      <TutorsPageLayout tutors={data?.data ?? []} />
    </div>
  );
}
