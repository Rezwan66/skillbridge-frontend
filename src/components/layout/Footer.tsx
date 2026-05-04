import { cn } from '@/lib/utils';

import { LogoImage, LogoText } from '@/components/ui/logo';
import Logo from '../modules/shared/Logo';

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: '/logo/mortarboard.png',
    alt: 'Skillbridge Logo',
    title: 'Skillbridge',
    url: '/',
  },
  className,
  tagline = 'Connect with expert tutors',
  menuItems = [
    {
      title: 'Tutors',
      links: [
        { text: 'Find Tutors', url: '/tutors' },
        { text: 'By Subject', url: '/subjects' },
        { text: 'Top Rated', url: '/tutors?sort=rating' },
        { text: 'Pricing', url: '/tutors?sort=price' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'About Us', url: '/about' },
        { text: 'How it Works', url: '/about#how-it-works' },
        { text: 'Testimonials', url: '/#testimonials' },
        { text: 'FAQ', url: '/#faq' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Contact Us', url: '/contact' },
        { text: 'Help Center', url: '/contact' },
        { text: 'Become a Tutor', url: '/register' },
      ],
    },
    {
      title: 'Social',
      links: [
        { text: 'Twitter', url: 'https://twitter.com' },
        { text: 'Instagram', url: 'https://instagram.com' },
        { text: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
  ],
  copyright = '© 2026 Made with ❤️ using Next.Js. All rights reserved.',
  bottomLinks = [
    { text: 'Terms and Conditions', url: '/terms' },
    { text: 'Privacy Policy', url: '/privacy' },
  ],
}: Footer2Props) => {
  return (
    <section className={cn('py-16 bg-muted/30 border-t', className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo />
              </div>
              <p className="mt-4 font-medium text-muted-foreground">{tagline}</p>
              <div className="mt-6 text-sm text-muted-foreground space-y-2">
                <p>Email: support@skillbridge.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-6">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
