import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "@/core/services/review.service";

const reviewService = new ReviewService();

export async function GET() {
  try {
    const result = await reviewService.getAllReviews();

    const statusCode = result.success ? 200 : 500;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error("GET /api/reviews error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User authentication required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body is required",
        },
        { status: 400 }
      );
    }

    const result = await reviewService.createReview(parseInt(userId), body);

    const statusCode = result.success ? 201 : 400;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error("POST /api/reviews error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
