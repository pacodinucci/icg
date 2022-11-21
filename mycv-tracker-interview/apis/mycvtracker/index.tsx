import { default as axios } from "axios";
import { AudioResponse } from "../../types/audioResponse_types";
import { SignupUserObject } from "../../types/auth_types";

const baseURL = process.env.NEXT_PUBLIC_MYCVTRACKER_API_HOST;

const apiInstance = axios.create({
  baseURL,
});

const sendAddUser = async (user: SignupUserObject) => {
  return await apiInstance.post("/auth/signup", user);
};

const sendForgotPasswordRequest = async (email: string) => {
  return await apiInstance.post("/auth/forgotPassword", email, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

const sendUpdateProfileSettings = async (profile: {}, token: string) => {
  return await apiInstance.post("/auth/saveProfileSettings", profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const sendGetUserProfileSettings = async (token: string) => {
  return await apiInstance.get("/auth/getUserProfileSettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getInterviewResponses = async (token: string) => {
  return await apiInstance.get<AudioResponse[]>(`/interviews/interviewResponse/${token}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export {
  sendAddUser,
  sendForgotPasswordRequest,
  sendUpdateProfileSettings,
  sendGetUserProfileSettings,
  getInterviewResponses,
};
