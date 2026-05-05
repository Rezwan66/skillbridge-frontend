import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { userService } from '@/services/user.service';
import { categoryService } from '@/services/category.service';
import { FloatingChat } from '@/components/layout/FloatingChat';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const { data: categoriesData } = await categoryService.getAllCategories();
  const categories = categoriesData?.data || [];

  const dynamicMenu = [
    { title: 'Home', url: '/' },
    { title: 'Tutors', url: '/tutors' },
    {
      title: 'Subjects',
      url: '/tutors',
      items: categories.slice(0, 6).map((category: any) => ({
        title: category.name,
        url: `/tutors?categoryId=${category.id}`,
        description: `Explore tutors for ${category.name}`,
      })),
    },
    { title: 'About Us', url: '/about' },
    { title: 'Contact', url: '/contact' },
  ];

  return (
    <div>
      <Navbar user={data?.user} menu={dynamicMenu} />
      <div className="container mx-auto p-4 min-h-screen">{children}</div>
      <Footer />
      <FloatingChat />
    </div>
  );
}
