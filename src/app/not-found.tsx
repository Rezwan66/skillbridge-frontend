import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center mt-40 flex flex-col gap-10 items-center">
      <p>404</p>
      <h2 className="font-bold text-5xl uppercase tracking-wider">Not Found</h2>
      <p>Could not find requested resource</p>
      <Button className="bg-pink-200 w-56 text-black hover:text-white rounded-2xl  dark:bg-rose-500 dark:text-white font-semibold dark:hover:bg-amber-400 dark:hover:text-black">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
