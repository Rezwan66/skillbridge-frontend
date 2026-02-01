import { Button } from '@/components/ui/button';
import { TutorCard } from '../tutors/TutorCard';
import { TutorProfile } from '@/types/tutor.type';

// const FEATURED_TUTORS = [
//   {
//     id: '1',
//     bio: 'Math tutor with 5+ years experience.',
//     hourlyRate: 25,
//     ratingAvg: 4.8,
//     totalReviews: 42,
//     tutorCategories: [
//       { category: { id: '1', name: 'Mathematics' } },
//       { category: { id: '2', name: 'Physics' } },
//     ],
//   },
//   {
//     id: '2',
//     bio: 'Web development mentor specialising in React.',
//     hourlyRate: 30,
//     ratingAvg: 4.9,
//     totalReviews: 58,
//     tutorCategories: [{ category: { id: '3', name: 'Web Development' } }],
//   },
//   {
//     id: '3',
//     bio: 'IELTS & English communication expert.',
//     hourlyRate: 20,
//     ratingAvg: 4.7,
//     totalReviews: 35,
//     tutorCategories: [{ category: { id: '4', name: 'English' } }],
//   },
// ];

export function FeaturedTutors({ tutors }: { tutors: TutorProfile[] }) {
  return (
    <section className="py-16 container">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold ">Top Tutors</h2>
          <p className="text-muted-foreground">
            Learn from our top-rated and most trusted tutors
          </p>
        </div>

        <Button variant="outline" asChild>
          <a href="/tutors">View All</a>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor, idx) => (
          <TutorCard key={tutor.id} tutor={tutor} idx={idx} />
        ))}
      </div>
    </section>
  );
}
