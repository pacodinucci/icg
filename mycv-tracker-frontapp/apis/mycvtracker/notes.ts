import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";
import { NotesResponse } from "../../types/note_types";

export const getNotes = async (pageNumber: number, pageSize: number) => {
  const token = getUserFromLocalStorage()?.token;
  try {
    const response = await apiInstance.get<NotesResponse>(`/user/notesList/${pageNumber}/${pageSize}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    Promise.reject(e);
  }
};
