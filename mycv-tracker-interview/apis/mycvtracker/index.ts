import { AudioResponse } from "../../types/audioResponse_types";
import { apiInstance } from "./config";

import {
  sendLoginUser,
  sendAddUser,
  sendForgotPasswordRequest,
  sendGetUserProfileSettings,
  sendUpdateProfileSettings,
} from "./auth";
import { sendAssignInterview, sendGetCandidateResult } from "./assign-interview";

const getInterviewResponses = async (token: string) => {
  return await apiInstance.get<AudioResponse[]>(`/interviews/interviewResponse/${token}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export {
  sendLoginUser,
  sendAddUser,
  sendForgotPasswordRequest,
  sendUpdateProfileSettings,
  sendGetUserProfileSettings,
  getInterviewResponses,
  sendAssignInterview,
  sendGetCandidateResult,
};
