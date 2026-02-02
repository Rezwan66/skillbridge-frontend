export interface BookingsData {
  id: string;
  studentId: string;
  tutorProfileId: string;
  availabilityId: string;
  status: string;
  review?: string;

  tutorProfile?: any;
  availability?: any;

  createdAt: Date;
  updatedAt: Date;
}
