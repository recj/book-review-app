import { ReviewRepository } from "@/repositories/review.repository";
import { validateCreateReview } from "@/core/validators/review.schema";
import type {
  CreateReviewRequest,
  ReviewResponse,
  ReviewErrorResponse,
  DeleteReviewResponse,
} from "@/core/dto/review.dto";

export class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async createReview(
    userId: number,
    requestData: CreateReviewRequest
  ): Promise<ReviewResponse | ReviewErrorResponse> {
    try {
      const validation = validateCreateReview(requestData);
      if (!validation.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: validation.error.issues.map((err) => err.message),
        };
      }

      const { book_title, rating, review, mood } = validation.data;

      const newReview = await this.reviewRepository.create({
        user_id: userId,
        book_title,
        rating,
        review,
        mood,
      });

      return {
        success: true,
        message: "Review created successfully",
        review: newReview,
      };
    } catch (error) {
      console.error("Create review error:", error);
      return {
        success: false,
        message: "Failed to create review. Please try again.",
      };
    }
  }

  async getAllReviews(): Promise<ReviewResponse | ReviewErrorResponse> {
    try {
      const reviews = await this.reviewRepository.findAll();

      return {
        success: true,
        message: "Reviews fetched successfully",
        reviews,
      };
    } catch (error) {
      console.error("Get all reviews error:", error);
      return {
        success: false,
        message: "Failed to fetch reviews",
      };
    }
  }

  async getReviewById(
    id: number
  ): Promise<ReviewResponse | ReviewErrorResponse> {
    try {
      const review = await this.reviewRepository.findById(id);

      if (!review) {
        return {
          success: false,
          message: "Review not found",
        };
      }

      return {
        success: true,
        message: "Review found",
        review,
      };
    } catch (error) {
      console.error("Get review by ID error:", error);
      return {
        success: false,
        message: "Failed to get review",
      };
    }
  }

  async deleteReview(
    reviewId: number,
    userId: number
  ): Promise<DeleteReviewResponse> {
    try {
      const isOwner = await this.reviewRepository.isOwner(reviewId, userId);

      if (!isOwner) {
        return {
          success: false,
          message: "Review not found or you are not authorized to delete it",
        };
      }

      const deleted = await this.reviewRepository.deleteById(reviewId, userId);

      if (!deleted) {
        return {
          success: false,
          message: "Failed to delete review",
        };
      }

      return {
        success: true,
        message: "Review deleted successfully",
      };
    } catch (error) {
      console.error("Delete review error:", error);
      return {
        success: false,
        message: "Failed to delete review. Please try again.",
      };
    }
  }
}
