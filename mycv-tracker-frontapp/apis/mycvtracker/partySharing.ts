import { apiInstance } from "./config";

import { PartySharing } from "../../types/partySharing_types";

export const getPartySharings = async (resumeId: number, page: number, pageSize: number, token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<PartySharing[]>(`/user/resume/${resumeId}/party-sharings?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};
