import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/core/services/auth.service";
import { verifyToken } from "@/lib/auth/jwt";

const authService = new AuthService();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authentication token provided",
        },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    const result = await authService.getMe(payload.userId);

    const statusCode = result.success ? 200 : 404;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error("Me route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
