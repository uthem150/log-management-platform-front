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

export interface OAuthResponse {
  data: {
    access: string;
    refresh: string;
  };
  message: string;
}
export interface GoogleLoginRequest {
  token: string;
}

export interface GithubLoginRequest {
  token: string;
}

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>("/auth/login", data),

  signup: (data: SignupRequest) => api.post<AuthResponse>("/auth/signup", data),

  logout: () => api.post("/auth/logout"),

  getCurrentUser: () => api.get<AuthResponse>("/auth/me"),

  googleLogin: (token: string) => api.post<OAuthResponse>("/user/login/google", { token }),

  githubLogin: (token: string) => api.post<OAuthResponse>("/user/login/github", { token })
};
