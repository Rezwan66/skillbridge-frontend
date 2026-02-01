import CategoriesMarquee from '@/components/modules/home/CategoriesMarquee';
import { FeaturedTutors } from '@/components/modules/home/FeaturedTutors';
import { HomeHero } from '@/components/modules/home/HomeHero';
import { TestimonialsSection } from '@/components/modules/home/TestimonialsSection';
import { userService } from '@/services/user.service';

const categories = [
  { id: '1', name: 'Bengali' },
  { id: '2', name: 'Biology' },
  { id: '3', name: 'Chemistry' },
  { id: '4', name: 'Deutsch' },
  { id: '5', name: 'Geography' },
  { id: '6', name: 'Mathematics' },
  { id: '7', name: 'Physics' },
];

export default async function HomePage() {
  const { data, error } = await userService.getSession();
  console.log(data);

  return (
    <div>
      <HomeHero />
      <FeaturedTutors />
      <CategoriesMarquee categories={categories} />
      <TestimonialsSection />
    </div>
  );
}
