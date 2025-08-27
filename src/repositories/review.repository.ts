import { query } from "@/lib/database/connection";
import type {
  ReviewWithUser,
  CreateReviewInternalData,
} from "@/lib/types/review.types";

export class ReviewRepository {
  async create(reviewData: CreateReviewInternalData): Promise<ReviewWithUser> {
    try {
      const insertSql = `
          INSERT INTO reviews (user_id, book_title, rating, review, mood)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, user_id, book_title, rating, review, mood, created_at
        `;

      const insertResult = await query(insertSql, [
        reviewData.user_id,
        reviewData.book_title,
        reviewData.rating,
        reviewData.review,
        reviewData.mood,
      ]);

      const reviewWithUser = await this.findById(insertResult.rows[0].id);
      return reviewWithUser!;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error("Failed to create review");
    }
  }

  async findAll(): Promise<ReviewWithUser[]> {
    const sql = `
    SELECT
      reviews.id,
      reviews.user_id,
      reviews.book_title,
      reviews.rating,
      reviews.review,
      reviews.mood,
      reviews.created_at,
      users.name as reviewer_name
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    ORDER BY reviews.created_at DESC
  `;

    try {
      const result = await query(sql);
      return result.rows as ReviewWithUser[];
    } catch (error) {
      console.error("Error getting all reviews:", error);
      throw new Error("Failed to get reviews");
    }
  }

  async findById(id: number): Promise<ReviewWithUser | null> {
    const sql = `
      SELECT
        reviews.id,
        reviews.user_id,
        reviews.book_title,
        reviews.rating,
        reviews.review,
        reviews.mood,
        reviews.created_at,
        users.name as reviewer_name
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.id = $1
    `;

    try {
      const result = await query(sql, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0] as ReviewWithUser;
    } catch (error) {
      console.error("Error finding review by ID:", error);
      throw new Error("Failed to find review");
    }
  }

  async deleteById(id: number, userId: number): Promise<boolean> {
    const sql = `
      DELETE FROM reviews
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;

    try {
      const result = await query(sql, [id, userId]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw new Error("Failed to delete review");
    }
  }

  async isOwner(reviewId: number, userId: number): Promise<boolean> {
    const sql = `
      SELECT 1 FROM reviews
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;

    try {
      const result = await query(sql, [reviewId, userId]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error checking review ownership:", error);
      return false;
    }
  }
}
