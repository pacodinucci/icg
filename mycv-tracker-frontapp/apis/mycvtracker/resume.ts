import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";
import { Resume } from "../../types/resume_types";

export const getMyResumes = async (token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<Resume[]>(`/user/resumesList`, {
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
