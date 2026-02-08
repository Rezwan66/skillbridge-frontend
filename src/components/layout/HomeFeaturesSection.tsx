import {
  SwatchBookIcon,
  SearchIcon,
  StarIcon,
  SmartphoneIcon,
  LockKeyholeIcon,
  ShieldBanIcon,
  Euro,
  Star,
  SwatchBook,
  LoaderIcon,
  Loader,
  EuroIcon,
} from 'lucide-react';

import Features from '@/components/shadcn-studio/blocks/features-section-01/FeaturesComponent';

const featuresList = [
  {
    icon: SwatchBookIcon,
    title: 'User-Friendly Interface',
    description:
      'Navigate effortlessly with our intuitive design, optimised for all devices.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
  },
  {
    icon: ShieldBanIcon,
    title: 'Secure Roles',
    description:
      'Enjoy a safe browsing experience with role-based dashboards for students and tutors.',
    cardBorderColor:
      'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
  },
  {
    icon: SearchIcon,
    title: 'Advanced Tutor Search',
    description:
      'Find tutors quickly with advanced filters, sorting options, and subjects.',
    cardBorderColor:
      'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
  },
  {
    icon: StarIcon,
    title: 'Student Reviews and Ratings',
    description:
      'Make informed decisions with detailed tutor reviews from other students.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10',
  },
  {
    icon: EuroIcon,
    title: 'Payment In-Person',
    description:
      'Book sessions first - pay on site directly. No hassle of online payment.',
    cardBorderColor:
      'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
  },
  {
    icon: LoaderIcon,
    title: 'Track Progress',
    description:
      'Track your progress effortlessly with useful stats and upcoming sessions',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
  },
];

const HomeFeaturesSection = () => {
  return <Features featuresList={featuresList} />;
};

export default HomeFeaturesSection;
