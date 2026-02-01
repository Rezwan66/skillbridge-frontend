import { TutorProfile } from '@/types/tutor.type';
import TutorPageCard from './TutorPageCard';

export default function TutorsGrid({ tutors }: { tutors: TutorProfile[] }) {
  if (!tutors.length) {
    return (
      <p className="text-muted-foreground text-center">No tutors found.</p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tutors?.map((tutor, idx) => (
        <TutorPageCard key={tutor.id} tutor={tutor} idx={idx} />
      ))}
    </div>
  );
}
