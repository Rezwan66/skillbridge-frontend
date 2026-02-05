'use client';

import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { updateTutorCategoriesAction } from '@/actions/tutor.action';
import { toast } from 'sonner';

export default function TutorCategoriesForm({
  categories = [],
  tutorsCategories = [],
}: {
  categories: Record<string, string | boolean>[];
  tutorsCategories: string[];
}) {
  const [selected, setSelected] = useState<string[]>(tutorsCategories);
  const [isPending, startTransition] = useTransition();
  //   console.log(tutorsCategories);
  console.log(selected);

  const toggleCategory = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id],
    );
  };

  const handleSubmitCategories = () => {
    startTransition(async () => {
      try {
        const res = await updateTutorCategoriesAction(selected);

        if (res?.error) {
          toast.error(res.error.message);
          return;
        }
        console.log(selected);
        toast.success('Categories updated');
      } catch (error: any) {
        toast.error(error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {categories.map(category => (
          <label
            key={category.id as string}
            className="flex items-center gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted"
          >
            <Checkbox
              checked={selected.includes(category.id as string)}
              onCheckedChange={() => toggleCategory(category.id as string)}
            />
            <span className="text-sm">{category.name}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmitCategories} disabled={isPending}>
          Save Categories
        </Button>
      </div>
    </div>
  );
}
