export interface ReviewGet {
  id: string;
  bookingId: string;
  studentId: string;
  tutorProfileId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
