// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatar?: string;
}
