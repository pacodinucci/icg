import { apiInstance } from "./config";
import { NotesResponse } from "../../types/note_types";

export const getNotes = async (pageNumber: number, pageSize: number, token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<NotesResponse>(`/user/notesList/${pageNumber}/${pageSize}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    Promise.reject(e);
  }
};
