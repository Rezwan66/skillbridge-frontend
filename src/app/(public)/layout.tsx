import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { userService } from '@/services/user.service';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  return (
    <div>
      <Navbar user={data?.user} />
      <div className="container mx-auto p-4 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
