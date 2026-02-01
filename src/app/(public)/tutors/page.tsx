import { tutorService } from '@/services/tutor.service';

export default async function TutorsPage() {
  const { data } = await tutorService.getAllTutors(
    { isFeatured: true },
    { revalidate: 100 },
  );
  console.log(data);
  return (
    <div>
      <h2>Total Tutors: {data?.data?.length}</h2>
    </div>
  );
}
