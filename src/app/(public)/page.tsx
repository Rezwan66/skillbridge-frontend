import HomeFeaturesSection from '@/components/layout/HomeFeaturesSection';
import CategoriesMarquee from '@/components/modules/home/CategoriesMarquee';
import { FeaturedTutors } from '@/components/modules/home/FeaturedTutors';
import { HomeHero } from '@/components/modules/home/HomeHero';
import { TestimonialsSection } from '@/components/modules/home/TestimonialsSection';
import { categoryService } from '@/services/category.service';
import { reviewService } from '@/services/review.service';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';

// const categories = [
//   { id: '1', name: 'Bengali' },
//   { id: '2', name: 'Biology' },
//   { id: '3', name: 'Chemistry' },
//   { id: '4', name: 'Deutsch' },
//   { id: '5', name: 'Geography' },
//   { id: '6', name: 'Mathematics' },
//   { id: '7', name: 'Physics' },
// ];

export default async function HomePage() {
  // const { data, error } = await userService.getSession();
  // console.log(data);

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

  // console.log({ tutors, subjects, reviews });

  return (
    <div>
      <HomeHero />
      <FeaturedTutors tutors={tutors?.data?.data ?? []} />
      <CategoriesMarquee categories={categories?.data?.data ?? []} />
      {/* <HomeHeroFeatures /> */}
      <HomeFeaturesSection />
      <TestimonialsSection reviews={reviews?.data?.data ?? []} />
    </div>
  );
}
