'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
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

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Minimum length is 8'),
});

const FRONTEND_URL = env.NEXT_PUBLIC_FRONTEND;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastSlug = toast.loading('Logging In');
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastSlug });
          return;
        }

        if (data.token) {
          toast.success('User Logged In Successfully', { id: toastSlug });
          //vavigate to home or sth
        }
        console.log(data);
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
      id="login-form"
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

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

        <Field>
          <Button form="login-form" type="submit">
            Login
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
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
