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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Input atleast 3 characters')
    .max(500, 'Name must be within 500 characters'),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.union([z.literal(''), z.string().url('Must be a valid URL')]),
});

export default function EditProfileForm({ user }: { user: UserInfo }) {
  const router = useRouter();
  const { name, email, emailVerified, image } = user;

  const form = useForm({
    defaultValues: {
      name: name || '',
      email: email || '',
      emailVerified: emailVerified || false,
      image: image || '',
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
        router.refresh(); // Refresh to update layouts
      } catch (error) {
        toast.error('Failed to update profile', { id: toastId });
      }
    },
  });
  
  const currentImage = form.getFieldValue('image') || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <Card className="max-w-2xl border-border/50 shadow-sm">
      <CardHeader className='pt-5 pb-1'>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Manage your personal information and display picture.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="edit-profile-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Avatar Preview Section */}
          <div className="flex items-center gap-6 pb-4 border-b">
            <div className="relative group cursor-pointer">
              <Avatar className="h-24 w-24 border border-border">
                <AvatarImage src={currentImage} alt="Profile preview" className="object-cover" />
                <AvatarFallback className="text-xl">ME</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">Provide a valid image URL to update your avatar.</p>
            </div>
          </div>

          <FieldGroup className="grid gap-5">
            {/* name */}
            <form.Field
              name="name"
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
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
            
            <div className="grid sm:grid-cols-2 gap-5">
              {/* email */}
              <form.Field
                name="email"
                children={field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      disabled
                      value={field.state.value}
                      placeholder="Email..."
                      className="bg-muted"
                    />
                  </Field>
                )}
              />
              {/* email verified */}
              <form.Field
                name="emailVerified"
                children={field => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Account Status</FieldLabel>
                    <Input
                      value={field.state.value ? 'Verified' : 'Unverified'}
                      disabled
                      className="bg-muted"
                    />
                  </Field>
                )}
              />
            </div>
            
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
                      placeholder="https://example.com/my-photo.jpg"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <div className="flex justify-end pt-4">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
