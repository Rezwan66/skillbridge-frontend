import Image from 'next/image';
import Link from 'next/link';

export const logo = {
  url: '/',
  src: '/logo/mortarboard-large.png',
  alt: 'logo',
  title: 'Skillbridge',
  subtitle: 'Never Stop Learning',
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
      <div className="flex flex-col justify-start">
        <span className="text-lg font-semibold tracking-tighter">
          {logo.title}
        </span>
        <span className="text-[8.5px]">{logo.subtitle}</span>
      </div>
    </Link>
  );
}
