import { Mood, ReviewWithUser } from "@/lib/types/review.types";

//REQUEST DTOs
export interface CreateReviewRequest {
  book_title: string;
  rating: number;
  review: string;
  mood: Mood;
}

//RESPONSE DTOs
export interface ReviewResponse {
  success: true;
  message: string;
  review?: ReviewWithUser;
  reviews?: ReviewWithUser[];
}

export interface ReviewErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

export interface DeleteReviewResponse {
  success: boolean;
  message: string;
}
