import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/core/services/auth.service";

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
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

    const { response, token } = await authService.login(body);

    if (response.success && token) {
      const nextResponse = NextResponse.json(response, { status: 200 });

      nextResponse.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 días
        path: "/",
      });

      return nextResponse;
    }

    const statusCode = 401;
    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    console.error("Login route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
