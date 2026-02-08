import { redirect } from 'next/navigation';
import { userService } from '@/services/user.service';
import { Roles } from '@/constants';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect('/login');
  }

  if (data.user.role !== Roles.tutor) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
