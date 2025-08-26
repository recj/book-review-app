import { query } from "@/lib/database/connection";
import { DatabaseError } from "pg";
import { CreateUserData, PublicUser } from "@/lib/types/user.types";

export class UserRepository {
  async create(userData: CreateUserData): Promise<PublicUser> {
    const sql = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

    try {
      const result = await query(sql, [
        userData.name,
        userData.email,
        userData.password,
      ]);

      return result.rows[0] as PublicUser;
    } catch (error) {
      if (error instanceof DatabaseError) {
        if (error.code === "23505" && error.constraint === "users_email_key") {
          throw new Error("Email already exists");
        }
      }
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
}
