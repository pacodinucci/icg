import { apiInstance } from "./config";
import { Resume } from "../../types/resume_types";

export type ShareResumePayload = {
  partyName: string;
  partyEmail: string;
  content: string;
}

export const getMyResumes = async (page: number, noOfRecords: number, token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<Resume[]>(`/user/active-resumes/list?page=${page}&noOfRecords=${noOfRecords}`, {
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

export const shareResume = async (resumeId: number, payload: ShareResumePayload , token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.post<Resume[]>(`/user/resume/${resumeId}/sharing`, payload, {
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
}


export const getMatchingResumes = async ( referralId: number, page: number, noOfRecords: number, token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<Resume[]>(`/job/${referralId}/bulk-folders-scan?page=${page}&noOfRecords=${noOfRecords}`, {
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
