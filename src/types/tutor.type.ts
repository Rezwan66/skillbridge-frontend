export interface TutorProfile {
  id: string;
  bio?: string | null;
  hourlyRate?: number | null;
  experienceYears?: number | null;
  ratingAvg?: number | null;
  totalReviews?: number | null;
  isFeatured?: boolean | null;
  tutorCategories: {
    category: {
      id: string;
      name: string;
    };
  }[];
}
