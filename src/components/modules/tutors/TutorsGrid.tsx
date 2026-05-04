import { TutorProfile } from '@/types/tutor.type';
import TutorPageCard from './TutorPageCard';

export default function TutorsGrid({ tutors }: { tutors: TutorProfile[] }) {
  if (!tutors.length) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
      {tutors?.map((tutor, idx) => (
        <TutorPageCard key={tutor.id} tutor={tutor} idx={idx} />
      ))}
    </div>
  );
}
