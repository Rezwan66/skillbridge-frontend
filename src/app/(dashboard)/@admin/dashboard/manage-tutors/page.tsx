import ManageTutorsTable from '@/components/modules/dashboard/admin/ManageTutorsTable';
import { adminService } from '@/services/admin.service';
import { tutorService } from '@/services/tutor.service';
import { TutorProfile } from '@/types/tutor.type';

export default async function ManageTutorsPage() {
  const { data } = await tutorService.getAllTutors({}, { cache: 'no-store' });
  const tutors: TutorProfile[] = data?.data ?? [];

  console.log(tutors);

  //   const allUsers: UserInfo[] = data?.data ?? [];
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">All Tutors</h1>
        <p className="text-muted-foreground">
          Manage all tutor profiles in the platform
        </p>
      </header>

      <ManageTutorsTable tutors={tutors} />
    </section>
  );
}
