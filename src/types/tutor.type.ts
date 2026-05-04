export interface TutorProfile {
  id: string;
  bio?: string | null;
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
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
  user?: {
    image?: string | null;
  } | null;
}

export interface TutorSearchParams {
  search?: string;
  categoryId?: string;
  minRating?: string;
  maxPrice?: string;
  isFeatured?: string;
  limit?: string;
  page?: string;
  sort?: string;
}

export interface TutorCreateProfile {
  bio?: string;
  hourlyRate?: number;
  experienceYears?: number;
}
