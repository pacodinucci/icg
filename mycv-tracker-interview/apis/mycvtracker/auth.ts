import { SignupUserObject } from "../../types/auth_types";
import { apiInstance } from "./config";

export const sendAddUser = async (user: SignupUserObject) => {
  return await apiInstance.post("/auth/signup", user);
};

export const sendForgotPasswordRequest = async (email: string) => {
  return await apiInstance.post("/auth/forgotPassword", email, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const sendUpdateProfileSettings = async (profile: {}, token: string) => {
  return await apiInstance.post("/auth/saveProfileSettings", profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendGetUserProfileSettings = async (token: string) => {
  return await apiInstance.get("/auth/getUserProfileSettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
