import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isValid = await bcryptjs.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Failed to verify password");
  }
};
