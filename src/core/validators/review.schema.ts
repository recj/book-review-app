import { z } from "zod";
import { AVAILABLE_MOODS, CreateReviewData } from "@/lib/types/review.types";

export const createReviewSchema = z.object({
  book_title: z
    .string()
    .min(1, "Book title is required")
    .max(200, "Book title must be less than 200 characters")
    .trim(),
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(3000, "Review must be less than 3000 characters")
    .trim(),
  mood: z.enum([...AVAILABLE_MOODS]),
});

export const validateCreateReview = (data: CreateReviewData) => {
  return createReviewSchema.safeParse(data);
};
