import { RouteItem } from '@/types/route.type';
import Link from 'next/link';

export default function MenuItemLink({ item }: { item: RouteItem }) {
  const Icon = item.icon;
  // console.log(Icon);
  return (
    <Link href={item.url}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {item.title}
    </Link>
  );
}
