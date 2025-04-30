// src/api/auth.ts
import api from "./index";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface GoogleLoginRequest {
  token: string;
}

export interface GithubLoginRequest {
  code: string;
}

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>("/auth/login", data),

  signup: (data: SignupRequest) => api.post<AuthResponse>("/auth/signup", data),

  logout: () => api.post("/auth/logout"),

  getCurrentUser: () => api.get<AuthResponse>("/auth/me"),

  googleLogin: (data: GoogleLoginRequest) => api.post<AuthResponse>("/user/login/google", data),

  githubLogin: (data: GithubLoginRequest) => api.post<AuthResponse>("/user/login/github", data)
};
