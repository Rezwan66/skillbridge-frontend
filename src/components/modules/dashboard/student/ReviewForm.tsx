'use client';
import { createReviewAction } from '@/actions/review.action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    // .min(5, 'Input atleast 5 characters')
    .max(2000, 'Review must be within 2000 characters'),
});

export default function ReviewForm({ bookingId }: { bookingId: string }) {
  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: '',
    },
    // validators: {
    //   onSubmit: reviewSchema,
    // },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Posting review....');
      const parsed = reviewSchema.safeParse(value);
      if (!parsed.success) {
        return toast.error('Invalid input', { id: toastId });
      }
      const reviewData = {
        bookingId: bookingId,
        rating: value.rating,
        comment: value.comment,
      };

      try {
        const res = await createReviewAction(reviewData);

        if (res.error) {
          return toast.error(res.error.message, { id: toastId });
        }

        toast.success('Review posted ✨', { id: toastId });
      } catch (error) {
        toast.error('Failed to submit review', { id: toastId });
      }
    },
  });
  return (
    <form
      id="review-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <FieldLabel className="text-md font-medium text-muted-foreground">
          Post a review
        </FieldLabel>
        {/* Rating */}
        <form.Field
          name="rating"
          children={field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Rating (1-5)</FieldLabel>
              <Input
                type="number"
                min={1}
                max={5}
                value={field.state.value}
                onChange={e => field.handleChange(+e.target.value)}
                placeholder="Rating (1–5)"
              />
            </Field>
          )}
        />
        {/* Comment */}
        <form.Field
          name="comment"
          children={field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Comment</FieldLabel>
              <Textarea
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="(Optional) comment"
              />
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end pt-4">
        <Button className="text-right" type="submit">
          Submit Review
        </Button>
      </div>
    </form>
  );
}
