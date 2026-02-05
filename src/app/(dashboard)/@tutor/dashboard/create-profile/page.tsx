import TutorProfileForm from '@/components/modules/dashboard/tutor/TutorProfileForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { tutorService } from '@/services/tutor.service';

export default async function CreateProfile() {
  const { data } = await tutorService.getMyTutorProfile();
  // console.log(data?.data);
  const tutorProfile = data?.data ?? {};
  // console.log(tutorProfile);
  // if (tutorProfile?.id) {
  //   return <h3>You have profile</h3>;
  // }
  const hasProfile = !!tutorProfile.id;

  // console.log(hasProfile);
  return (
    <section className="container mx-auto max-w-3xl py-10 space-y-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          {hasProfile ? 'Edit Tutor Profile' : 'Create Tutor Profile'}
        </h1>

        <div className="flex items-center gap-2">
          <Badge className="bg-blue-400 text-black text-xs uppercase">
            tutor
          </Badge>

          <Badge variant="outline" className="text-xs uppercase">
            {hasProfile ? 'active' : 'not created'}
          </Badge>
        </div>
      </header>

      <Separator />

      {/* FORM SECTION */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">
            {hasProfile
              ? 'Update your tutor profile'
              : 'Complete your tutor profile'}
          </h2>

          <TutorProfileForm tutorProfile={tutorProfile} />
        </CardContent>
      </Card>
    </section>
  );
}
