import HomeFeaturesSection from '@/components/layout/HomeFeaturesSection';
import CategoriesMarquee from '@/components/modules/home/CategoriesMarquee';
import { FeaturedTutors } from '@/components/modules/home/FeaturedTutors';
import { HomeHero } from '@/components/modules/home/HomeHero';
import { TestimonialsSection } from '@/components/modules/home/TestimonialsSection';
import { StatisticsSection } from '@/components/modules/home/StatisticsSection';
import { FaqSection } from '@/components/modules/home/FaqSection';
import { NewsletterSection } from '@/components/modules/home/NewsletterSection';
import { categoryService } from '@/services/category.service';
import { reviewService } from '@/services/review.service';
import { tutorService } from '@/services/tutor.service';

export default async function HomePage() {
  const tutorsPromise = tutorService.getAllTutors(
    { isFeatured: 'true' },
    {
      cache: 'no-store',
    },
  );
  const categoriesPromise = categoryService.getAllCategories({
    cache: 'no-store',
  });
  const reviewsPromise = reviewService.getAllReviews({ cache: 'no-store' });

  const [tutors, categories, reviews] = await Promise.all([
    tutorsPromise,
    categoriesPromise,
    reviewsPromise,
  ]);

  return (
    <div>
      <HomeHero />
      <StatisticsSection />
      <FeaturedTutors tutors={tutors?.data?.data ?? []} />
      <CategoriesMarquee categories={categories?.data?.data ?? []} />
      <HomeFeaturesSection />
      <TestimonialsSection reviews={reviews?.data?.data ?? []} />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
}
