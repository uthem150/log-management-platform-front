// src/api/profile.ts
import api from "./index";
import { User, UpdateProfileRequest } from "../types/user";

export const profileApi = {
  getProfile: () => api.get<User>("/profile"),

  updateProfile: (data: UpdateProfileRequest) => api.patch<User>("/profile", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post("/profile/change-password", data)
};
