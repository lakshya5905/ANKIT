export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface AdminAuthSession {
  user: User | null;
  token?: string;
  rememberMe: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
