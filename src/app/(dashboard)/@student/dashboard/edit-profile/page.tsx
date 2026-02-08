import EditProfileForm from '@/components/modules/dashboard/student/EditProfileForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { userService } from '@/services/user.service';

export default async function EditProfilePage() {
  const { data } = await userService.getSession();
  // console.log(data);
  const user = data?.user;
  return (
    <section className="container mx-auto max-w-3xl py-10 space-y-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Edit Profile</h1>

        {/* badges */}
        <div className="flex items-center gap-2">
          {user.role && (
            <Badge
              variant="secondary"
              className={`text-xs text-black uppercase ${user.role === 'STUDENT' ? 'bg-green-400' : user.role === 'TUTOR' ? 'bg-blue-400' : 'bg-amber-400'}`}
            >
              {user.role.toLowerCase()}
            </Badge>
          )}

          <Badge variant="outline" className="text-xs uppercase">
            {user.status}
          </Badge>
        </div>
      </header>

      <Separator />

      {/* Edit Profile SECTION */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">Profile</h2>

          <EditProfileForm user={user} />
        </CardContent>
      </Card>
    </section>
  );
}
