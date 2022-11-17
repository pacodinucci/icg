import { default as axios } from "axios";

const baseURL = process.env.NEXT_PUBLIC_MYCVTRACKER_API_HOST;

const apiInstance = axios.create({
  baseURL,
});

const getVersion = async (): Promise<void> => {
  // make a api call here
};

const sendForgotPasswordRequest = async (email: string) => {
  return await apiInstance.post("/auth/forgotPassword", email, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

// const sendUpdateProfileSettings = async (profile: {}, token: string) => {
//   return await apiInstance.post("/auth/saveProfileSettings", profile, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
const sendGetUserProfileSettings = async (token: string) => {
  return await apiInstance.get("/auth/getUserProfileSettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getVersion, sendForgotPasswordRequest, sendGetUserProfileSettings };
