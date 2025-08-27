export interface Review {
  id: number;
  user_id: number;
  book_title: string;
  rating: number;
  review: string;
  mood: string;
  created_at: Date;
}

export interface ReviewWithUser {
  id: number;
  user_id: number;
  book_title: string;
  rating: number;
  review: string;
  mood: string;
  created_at: Date;
  reviewer_name: string;
}

export interface CreateReviewData {
  book_title: string;
  rating: number;
  review: string;
  mood: Mood;
}

export interface CreateReviewInternalData extends CreateReviewData {
  user_id: number;
}

export const AVAILABLE_MOODS = [
  "Excited",
  "Thoughtful",
  "Inspired",
  "Disappointed",
  "Neutral",
] as const;

export type Mood = (typeof AVAILABLE_MOODS)[number];
