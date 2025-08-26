import { UserRepository } from "@/repositories/user.repository";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/jwt";
import { validateSignup, validateLogin } from "@/core/validators/auth.schema";
import type {
  SignupRequest,
  LoginRequest,
  SignupResponse,
  LoginResponse,
  GetMeResponse,
} from "@/core/dto/auth.dto";

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

      const emailExists = await this.userRepository.emailExists(email);
      if (emailExists) {
        return {
          success: false,
          message: "Email already registered",
        };
      }

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

  async login(requestData: LoginRequest): Promise<{
    response: LoginResponse;
    token?: string;
  }> {
    try {
      const validation = validateLogin(requestData);
      if (!validation.success) {
        return {
          response: {
            success: false,
            message: "Validation failed",
            errors: validation.error.issues.map((err) => err.message),
          },
        };
      }

      const { email, password } = validation.data;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return {
          response: {
            success: false,
            message: "Invalid credentials",
          },
        };
      }

      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return {
          response: {
            success: false,
            message: "Invalid credentials",
          },
        };
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        name: user.name,
      });

      return {
        response: {
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        token,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        response: {
          success: false,
          message: "Login failed. Please try again.",
        },
      };
    }
  }

  async getMe(userId: number): Promise<GetMeResponse> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User found",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Get user error:", error);
      return {
        success: false,
        message: "Failed to get user information",
      };
    }
  }
}
