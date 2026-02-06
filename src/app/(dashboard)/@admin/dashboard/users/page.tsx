import ManageAllUsersTable from '@/components/modules/dashboard/admin/ManageAllUsersTable';
import MyBookingsTable from '@/components/modules/dashboard/student/MyBookingsTable';
import { adminService } from '@/services/admin.service';
import { bookingService } from '@/services/booking.service';
import { userService } from '@/services/user.service';
import { UserInfo } from '@/types/user.type';

export default async function AllUsersPage() {
  const { data } = await adminService.getAllUsers();

  // console.log(data?.data);

  const allUsers: UserInfo[] = data?.data ?? [];
  return (
    <section className="space-y-6">
      {/* <BookingSuccessToast success={resolved.success} /> */}

      <header>
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-muted-foreground">
          Manage all users in the platform
        </p>
      </header>

      <ManageAllUsersTable allUsers={allUsers} />
    </section>
  );
}
