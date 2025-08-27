import jwt, { SignOptions } from "jsonwebtoken";
import { JWTPayload } from "@/lib/types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ||
  "7d") as SignOptions["expiresIn"];

export const generateToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: "book-review-app",
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate token");
  }
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid JWT token:", error.message);
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT token expired:", error.message);
    } else {
      console.error("JWT verification error:", error);
    }
    return null;
  }
};
