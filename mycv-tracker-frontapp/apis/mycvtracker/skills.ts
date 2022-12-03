import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";
import { Skills } from "../../types/skills_types";

export const getMySkills = async (token: string) => {
  try {
    const response = await apiInstance.get<Skills[]>(`/tech-skills/list/`, {
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
