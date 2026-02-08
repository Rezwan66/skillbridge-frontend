import { AdminStats } from '@/components/modules/dashboard/admin/AdminStats';
import DashboardProfile from '@/components/modules/dashboard/shared/DashboardProfile';
import SessionInfo from '@/components/modules/dashboard/shared/SessionInfo';
import { StudentStats } from '@/components/modules/dashboard/student/StudentStats';
import ProfileCard from '@/components/modules/shared/ProfileCard';
import { userService } from '@/services/user.service';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data } = await userService.getSession();
  const { data: stats } = await userService.getStats();
  // console.log(stats);
  const { user, session } = data ?? {};
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>

      <DashboardProfile user={user} />
      {/* <ProfileCard user={user} /> */}
      <SessionInfo session={session} />

      <AdminStats stats={stats?.data} />
    </div>
  );
}
