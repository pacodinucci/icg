import { apiInstance } from "./config";

import { AssignInterviewRequest } from "../../types/assignInterview_types";

export const sendAssignInterview = async (values: AssignInterviewRequest, token: string) => {
  return apiInstance.post(
    "interviews/assignInterview",
    { ...values, candidateList: "" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
