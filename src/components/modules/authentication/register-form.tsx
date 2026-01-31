'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { env } from '@/env';
import Link from 'next/link';
import { Roles } from '@/constants/roles';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email(),
  password: z.string().min(8, 'Minimum password length should be 8'),
  role: z.enum([Roles.student, Roles.tutor]),
});

const FRONTEND_URL = env.NEXT_PUBLIC_FRONTEND;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastSlug = toast.loading('Creating User Account');
      try {
        const { data, error } = await authClient.signUp.email(value);
        console.log(value);

        if (error) {
          toast.error(error.message, { id: toastSlug });
          return;
        }
        if (data.user) {
          toast.success('User Account Created Successfully', { id: toastSlug });
        }
        console.log(data);
        //! must navigate to login, since we are not auto logged in
        form.reset();
      } catch (error) {
        toast.error('Something went wrong, please try again.', {
          id: toastSlug,
        });
      }
    },
  });

  return (
    <form
      id="register-form"
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        {/* name */}
        <form.Field
          name="name"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* email */}
        <form.Field
          name="email"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* pass */}
        <form.Field
          name="password"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* role */}
        <form.Field
          name="role"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field orientation="responsive" data-invalid={isInvalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-tanstack-select-role">
                    Select Role
                  </FieldLabel>
                  <FieldDescription>
                    Are you a student or a tutor?
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="form-tanstack-select-role"
                    aria-invalid={isInvalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem disabled value="role">
                      Role
                    </SelectItem>
                    <SelectItem value={`${Roles.student}`}>Student</SelectItem>
                    <SelectItem value={`${Roles.tutor}`}>Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />

        <Field>
          <Button form="register-form" type="submit">
            Register
          </Button>
        </Field>

        {/* SOCIAL */}
        <FieldSeparator></FieldSeparator>

        {/* <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button> */}
        <FieldDescription className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
