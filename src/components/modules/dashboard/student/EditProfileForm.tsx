'use client';
import { updateMyProfileAction } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { UserInfo } from '@/types/user.type';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Input atleast 3 characters')
    .max(500, 'Name must be within 500 characters'),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.url('Must be a valid URL'),
});

export default function EditProfileForm({ user }: { user: UserInfo }) {
  const router = useRouter();
  // console.log(Object.keys(user).join(','));
  const { name, email, emailVerified, image } = user;

  const form = useForm({
    defaultValues: {
      name,
      email,
      emailVerified,
      image,
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Updating profile....');
      const profileData: {
        name: string;
        image: string;
      } = {
        name: value.name,
        image: value.image as string,
      };

      try {
        const res = await updateMyProfileAction(profileData);

        if (res.error) {
          return toast.error(res.error.message, { id: toastId });
        }
        toast.success('Profile Updated ✨', { id: toastId });
        router.push('/dashboard');
      } catch (error) {
        toast.error('Failed to update profile', { id: toastId });
      }
    },
  });
  return (
    <form
      id="edit-profile-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-3"
    >
      <FieldGroup>
        <FieldLabel className="text-sm italic font-medium text-muted-foreground">
          Edit a field
        </FieldLabel>
        {/* name */}
        <form.Field
          name="name"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Your full name..."
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* email */}
        <form.Field
          name="email"
          children={field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                disabled
                value={field.state.value}
                placeholder="Email..."
              />
            </Field>
          )}
        />
        {/* email verified */}
        <form.Field
          name="emailVerified"
          children={field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email verified?</FieldLabel>
              <Input
                value={field.state.value ? 'Yes' : 'No'}
                disabled
                placeholder="Is the email verified?"
              />
            </Field>
          )}
        />
        {/* image */}
        <form.Field
          name="image"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                <Input
                  value={field.state.value ?? ''}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Display image URL..."
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="flex justify-end pt-4">
        <Button className="text-right" type="submit">
          Update Profile
        </Button>
      </div>
    </form>
  );
}
