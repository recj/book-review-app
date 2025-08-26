export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
