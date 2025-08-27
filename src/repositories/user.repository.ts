import { query } from "@/lib/database/connection";
import { DatabaseError } from "pg";
import { User, CreateUserData, PublicUser } from "@/lib/types/user.types";

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

  async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT id, name, email, password, created_at
      FROM users
      WHERE email = $1
    `;

    try {
      const result = await query(sql, [email]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0] as User;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Failed to find user");
    }
  }

  async findById(id: number): Promise<PublicUser | null> {
    const sql = `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = $1
    `;

    try {
      const result = await query(sql, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0] as PublicUser;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new Error("Failed to find user");
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const sql = `
      SELECT 1 FROM users WHERE email = $1 LIMIT 1
    `;

    try {
      const result = await query(sql, [email]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw new Error("Failed to check email");
    }
  }
}
