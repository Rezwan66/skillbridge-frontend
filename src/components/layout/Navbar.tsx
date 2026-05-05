'use client';

import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { UserInfo } from '@/types/user.type';
import { UserMenu } from '../modules/shared/NavUserMenu';
import Logo from '../modules/shared/Logo';

export const dynamic = 'force-dynamic';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  user?: UserInfo;
}

const Navbar = ({
  logo = {
    url: '/',
    src: '/logo/mortarboard.png',
    alt: 'logo',
    title: 'Skillbridge',
  },
  menu = [
    { title: 'Home', url: '/' },
    { title: 'Tutors', url: '/tutors' },
    {
      title: 'Subjects',
      url: '/subjects',
      items: [
        { title: 'Web Development', url: '/tutors?category=web', description: 'Learn to build modern web apps' },
        { title: 'Data Science', url: '/tutors?category=data', description: 'Master AI and Machine Learning' },
        { title: 'Languages', url: '/tutors?category=languages', description: 'Learn a new spoken language' },
      ],
    },
    { title: 'About Us', url: '/about' },
    { title: 'Contact', url: '/contact' },
  ],
  auth = {
    login: { title: 'Login', url: '/login' },
    signup: { title: 'Sign up', url: '/register' },
  },
  className,
  user,
}: Navbar1Props) => {
  const navMenu = user ? [
    ...menu,
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Profile', url: '/dashboard/profile' }
  ] : menu;

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md py-4 transition-all duration-300', className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="flex items-center absolute left-1/2 -translate-x-1/2">
              <NavigationMenu>
                <NavigationMenuList>{navMenu.map(item => renderMenuItem(item))}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <ModeToggle />
              <UserMenu
                user={{
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                }}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <ModeToggle />
              <Button asChild variant="outline" size="sm">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4 mt-6">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {navMenu.map(item => renderMobileMenuItem(item))}
                  </Accordion>

                  {user ? (
                    <div className="flex items-center gap-3 justify-between mt-4">
                      <UserMenu
                        user={{
                          id: user.id,
                          name: user.name,
                          email: user.email,
                          image: user.image,
                        }}
                      />
                      <ModeToggle />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-4">
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 hover:text-primary">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.url}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary"
                  >
                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                      {subItem.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-primary"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className="pl-4 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {subItem.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
