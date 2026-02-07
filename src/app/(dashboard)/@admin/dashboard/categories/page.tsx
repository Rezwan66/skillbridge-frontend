import AddCategoryForm from '@/components/modules/dashboard/admin/AddCategoryForm';
import EditCategoryStatusButton from '@/components/modules/dashboard/admin/EditCategoryStatusButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { categoryService } from '@/services/category.service';
import { Category } from '@/types/category.type';

export default async function AddCategories() {
  const { data } = await categoryService.getAllCategories({
    cache: 'no-store',
  });
  const categories: Category[] = data?.data ?? [];
  // console.log(categories);
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <p className="text-muted-foreground">
          Add, view and deactivate subjects
        </p>
      </header>

      <Separator />

      {/* DISPLAY CATEGORIES */}
      <Card className="p-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">All Categories:</h2>
          <p className="text-muted-foreground italic">
            Click to activate/deactivate
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {categories?.map(cat => {
            return (
              <div key={cat.id} className="flex flex-row items-center gap-2">
                <EditCategoryStatusButton cat={cat} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Separator />
      {/* CATEGORY SECTION */}
      <Card className="p-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add Categories</h2>
          {/* <ReviewForm /> */}
          <AddCategoryForm />
        </CardContent>
      </Card>
    </section>
  );
}
