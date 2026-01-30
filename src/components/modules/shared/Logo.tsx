import Image from 'next/image';
import Link from 'next/link';

export const logo = {
  url: 'https://www.shadcnblocks.com',
  src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
  alt: 'logo',
  title: 'Shadcnblocks.com',
};

export default function Logo() {
  return (
    <Link href={logo.url} className="flex items-center gap-2">
      <Image
        src={logo.src}
        width={32}
        height={32}
        className="max-h-8 dark:invert"
        alt={logo.alt}
      />
      <span className="text-lg font-semibold tracking-tighter">
        {logo.title}
      </span>
    </Link>
  );
}
