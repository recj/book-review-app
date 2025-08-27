import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "@/core/services/review.service";

const reviewService = new ReviewService();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const reviewId = parseInt(id);

  if (isNaN(reviewId) || reviewId <= 0) {
    return NextResponse.json(
      { success: false, message: "Invalid review ID" },
      { status: 400 }
    );
  }

  try {
    const result = await reviewService.getReviewById(reviewId);
    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error(`GET /api/reviews/${id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const reviewId = parseInt(id);

  if (isNaN(reviewId) || reviewId <= 0) {
    return NextResponse.json(
      { success: false, message: "Invalid review ID" },
      { status: 400 }
    );
  }

  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User authentication required" },
      { status: 401 }
    );
  }

  try {
    const parsedUserId = parseInt(userId);
    const result = await reviewService.deleteReview(reviewId, parsedUserId);

    const statusCode = result.success
      ? 200
      : result.message.includes("not authorized")
      ? 403
      : 404;

    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error(`DELETE /api/reviews/${id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
