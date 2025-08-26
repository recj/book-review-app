//REQUEST DTOs
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

//RESPONSE DTOs
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface AuthErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

export type SignupResponse = AuthResponse | AuthErrorResponse;
export type LoginResponse = AuthResponse | AuthErrorResponse;
