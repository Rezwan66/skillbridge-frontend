'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TutorError() {
  return (
    <div className="text-center mt-40 flex flex-col gap-10 items-center">
      <p className="font-black">400</p>
      <h2 className="font-bold text-5xl tracking-wider">Uh Oh</h2>
      <p>Encountered an Error. Please try again later</p>
      <Button className="bg-pink-200 w-56 text-black hover:text-white rounded-2xl  dark:bg-rose-500 dark:text-white font-semibold dark:hover:bg-amber-400 dark:hover:text-black">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
