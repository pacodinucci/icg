import { AudioResponse } from "../../types/audioResponse_types";
import { apiInstance } from "./config";

import { sendAddUser, sendForgotPasswordRequest, sendGetUserProfileSettings, sendUpdateProfileSettings } from "./auth";
import { sendAssignInterview } from "./assign-interview";

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
  sendAssignInterview,
};
