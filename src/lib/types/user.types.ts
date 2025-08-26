export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}
