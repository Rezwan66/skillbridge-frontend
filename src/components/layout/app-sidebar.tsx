import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { Roles } from '@/constants';
import { adminRoutes } from '@/routes/adminRoutes';
import { tutorRoutes } from '@/routes/tutorRoutes';
import { studentRoutes } from '@/routes/studentRoutes';
import Link from 'next/link';

import ProfileCard from '../modules/shared/ProfileCard';
import { UserInfo } from '@/types/user.type';
import { ModeToggle } from './ModeToggle';
import MenuItemLink from '../icons/MenuItemLink';

export function AppSidebar({
  user,
  ...props
}: {
  user: UserInfo & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];
  // console.log('sidebar', user);

  switch (user?.role) {
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
      <div className="p-4 flex flex-row items-center justify-between">
        <Logo />
        <ModeToggle />
      </div>
      <SidebarHeader className="mx-auto hidden lg:block">
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* Logo */}
        {/* <SearchForm /> */}

        <Calendar01 />
      </SidebarHeader>
      <SidebarContent className="">
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
                        <MenuItemLink item={item} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <ProfileCard user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
