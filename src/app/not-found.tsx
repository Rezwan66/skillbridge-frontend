import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center mt-40 flex flex-col gap-6 items-center">
      <p>404</p>
      <h2 className="font-bold text-5xl uppercase tracking-wider">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="bg-pink-200 w-36 rounded-2xl px-4 py-2 dark:text-black"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
