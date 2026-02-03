import { LucideIcon } from 'lucide-react';

export interface Route {
  title: string;
  items: RouteItem[];
}

export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}
