import fs from "fs";
import path from "path";
import { query, testConnection } from "../connection";
import dotenv from "dotenv";

dotenv.config();

export const runMigrations = async (): Promise<boolean> => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("Database connection failed");
    }

    const migrationPath = path.join(
      process.cwd(),
      "src/lib/database/migrations/init.sql"
    );
    const migrationSQL = fs.readFileSync(migrationPath, "utf8");

    console.log("1. Running database migrations...");
    await query(migrationSQL);
    console.log("2. Database migrations completed successfully");

    return true;
  } catch (error) {
    console.error("Migration failed:", error);
    return false;
  }
};

if (require.main === module) {
  runMigrations()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Migration script error:", error);
      process.exit(1);
    });
}
