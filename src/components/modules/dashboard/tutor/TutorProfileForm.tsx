'use client';

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
import {
  createTutorProfileAction,
  CreateTutorProfileType,
} from '@/actions/tutor.action';
import { TutorProfile } from '@/types/tutor.type';

const tutorProfileSchema = z.object({
  name: z.string().min(3, 'Minimum 3 characters'),
  bio: z.string().max(255),
  hourlyRate: z.number().min(1),
  experienceYears: z.number().min(0),
});

export default function TutorProfileForm({
  tutorProfile,
}: {
  tutorProfile: TutorProfile;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: tutorProfile?.name ?? '',
      bio: tutorProfile?.bio ?? '',
      hourlyRate: Number(tutorProfile?.hourlyRate),
      experienceYears: Number(tutorProfile?.experienceYears),
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }: { value: CreateTutorProfileType }) => {
      const toastId = toast.loading(
        tutorProfile ? 'Updating profile…' : 'Creating profile…',
      );

      try {
        const res = await createTutorProfileAction(value);

        if (res.error) {
          return toast.error(res.error.message, { id: toastId });
        }
        console.log(value);
        toast.success(
          tutorProfile ? 'Profile updated ✨' : 'Profile created 🎉',
          { id: toastId },
        );

        router.refresh();
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        {/* NAME */}
        <form.Field
          name="name"
          children={field => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="Your public tutor name"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />

        {/* BIO */}
        <form.Field
          name="bio"
          children={field => (
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                value={field.state.value ?? ''}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="Short introduction about you"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />

        {/* HOURLY RATE */}
        <form.Field
          name="hourlyRate"
          children={field => (
            <Field>
              <FieldLabel>Hourly Rate (€)</FieldLabel>
              <Input
                type="number"
                value={field.state.value}
                onChange={e =>
                  field.handleChange(
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />

        {/* EXPERIENCE */}
        <form.Field
          name="experienceYears"
          children={field => (
            <Field>
              <FieldLabel>Years of Experience</FieldLabel>
              <Input
                type="number"
                value={field.state.value ?? ''}
                onChange={e =>
                  field.handleChange(
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {tutorProfile ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>
    </form>
  );
}
