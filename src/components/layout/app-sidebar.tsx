import * as React from 'react';

import { SearchForm } from '@/components/layout/search-form';
import { VersionSwitcher } from '@/components/layout/version-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Calendar01 from './calendar-01';

import Logo from '../modules/shared/Logo';
import { Route } from '@/types/routes.type';
import { Roles } from '@/constants/roles';
import { adminRoutes } from '@/routes/adminRoutes';
import { tutorRoutes } from '@/routes/tutorRoutes';
import { studentRoutes } from '@/routes/studentRoutes';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.tutor:
      routes = tutorRoutes;
      break;
    case Roles.student:
      routes = studentRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* Logo */}
        <Logo />
        {/* <SearchForm /> */}
        <div className="mx-auto mt-2 py-4">
          <Calendar01 />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <div>
          {/* <Separator /> */}
          {routes.map(item => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
