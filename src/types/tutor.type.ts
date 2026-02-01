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

export interface TutorSearchParams {
  search?: string | undefined;
  categoryId?: string | undefined;
  minRating?: number | undefined;
  maxPrice?: number | undefined;
  isFeatured?: boolean;
}
