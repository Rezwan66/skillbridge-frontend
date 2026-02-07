'use client';
import { createCategoryAction } from '@/actions/admin.action';
import { createReviewAction } from '@/actions/review.action';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Input atleast 3 characters')
    .max(500, 'Category name must be within 500 characters')
    .refine(val => !/\d/.test(val), 'Category name cannot contain numbers')
    .refine(val => {
      const words = val.trim().split(/\s+/);
      return words.every(
        word =>
          word[0] === word[0].toUpperCase() &&
          word.slice(1) === word.slice(1).toLowerCase(),
      );
    }, 'Each word must start with a capital letter (e.g., "Social Science")'),
});

export default function AddCategoryForm() {
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Adding category....');
      //   const parsed = reviewSchema.safeParse(value);
      //   if (!parsed.success) {
      //     return toast.error('Invalid input', { id: toastId });
      //   }
      const categoryData = {
        name: value.name,
      };

      try {
        const res = await createCategoryAction(categoryData);
        // console.log(categoryData);

        if (res.error) {
          return toast.error(res.error.message, { id: toastId });
        }

        toast.success('Category added ✨', { id: toastId });
        form.reset();
      } catch (error) {
        toast.error('Failed to add category', { id: toastId });
      }
    },
  });
  return (
    <form
      id="add-category-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <FieldLabel className="text-md font-medium text-muted-foreground">
          Add a category name to be added to the website
        </FieldLabel>

        {/* name */}
        <form.Field
          name="name"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Eg. 'Accounting'"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="flex justify-end pt-4">
        <Button className="text-right" type="submit">
          Add Category
        </Button>
      </div>
    </form>
  );
}
