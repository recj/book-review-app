import { UserRepository } from "@/repositories/user.repository";
import { hashPassword } from "@/lib/auth/password";
import { validateSignup } from "@/core/validators/auth.schema";
import type { SignupRequest, SignupResponse } from "@/core/dto/auth.dto";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(requestData: SignupRequest): Promise<SignupResponse> {
    try {
      const validation = validateSignup(requestData);
      if (!validation.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: validation.error.issues.map((err) => err.message),
        };
      }

      const { name, email, password } = validation.data;

      const hashedPassword = await hashPassword(password);

      const newUser = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      return {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  }
}
