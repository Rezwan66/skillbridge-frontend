import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from '@/components/modules/authentication/login-form';
import Image from 'next/image';
import Logo from '@/components/modules/shared/Logo';
import { authClient } from '@/lib/auth-client';
import { Suspense } from 'react';

export default function LoginPage() {
  // const session = await authClient.getSession();
  // console.log(session);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a> */}
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<div>Loading...</div>}>
              {' '}
              {/* ✅ Wrap in Suspense */}
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/auth.jpg"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          alt="Student studying on a laptop"
        />
      </div>
    </div>
  );
}
