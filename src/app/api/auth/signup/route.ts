// src/app/api/auth/signup/route.ts
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

    const result = await authService.signup(body);

    const statusCode = result.success ? 201 : 400;

    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error("Signup route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
