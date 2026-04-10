import TutorCategoriesForm from '@/components/modules/dashboard/tutor/TutorCategoriesForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { categoryService } from '@/services/category.service';
import { tutorService } from '@/services/tutor.service';
import { Category } from '@/types/category.type';

export default async function CategoriesPage() {
  const { data: profileData } = await tutorService.getMyTutorProfile();
  const tutorProfile = profileData?.data ?? {};

  const { data } = await categoryService.getAllCategories();
  //   console.log(data?.data);
  const categories: Category[] = data?.data ?? [];
  // console.log({categories, tutorProfile});
  const activeCategories = categories.filter(cat => cat.isActive === true);
  return (
    <section className="container mx-auto max-w-3xl py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Teaching Categories</h1>
        <p className="text-muted-foreground">
          Select the subjects you want to teach
        </p>

        <div className="flex items-center gap-2 mt-4">
          {tutorProfile?.tutorCategories?.map(
            (cat: Record<string, string | Record<string, string>>) => (
              <Badge key={cat?.id as string} variant="outline" className="">
                {typeof cat?.category === 'object' && cat?.category?.name
                  ? (cat?.category?.name as string)
                  : ''}
              </Badge>
            ),
          )}
        </div>
      </header>

      <Separator />

      <Card className="p-6">
        <CardHeader>
          <h3 className="text-muted-foreground">Active Categories:</h3>
        </CardHeader>
        <CardContent>
          <TutorCategoriesForm
            categories={activeCategories}
            tutorsCategories={tutorProfile?.tutorCategories?.map(
              (cat: any) => cat?.categoryId as string,
            )}
          />
        </CardContent>
      </Card>
    </section>
  );
}
