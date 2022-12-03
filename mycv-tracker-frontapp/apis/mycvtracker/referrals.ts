import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";
import { Referral } from "../../types/referral_types";

export const getMyReferrals = async (page: number, noOfRecords: number, token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<Referral[]>(`/links/referrals?page=${page}&noOfRecords=${noOfRecords}`, {
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
