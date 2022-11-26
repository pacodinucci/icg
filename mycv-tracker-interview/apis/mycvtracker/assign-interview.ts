import { apiInstance } from "./config";

import { AssignInterviewRequest, CandidateResultRequest } from "../../types/assignInterview_types";

export const sendAssignInterview = async (values: AssignInterviewRequest, token: string) => {
  return apiInstance.post("interviews/assignInterview", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendGetCandidateResult = async (values: CandidateResultRequest, token: string) => {
  return apiInstance.put("interviews/candidateResults", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
