import { apiInstance } from "./config";
import { Notification } from "../../types/notification_types";

export const getMyNotifications = async (token: string) => {
  if (!token) return;
  try {
    const response = await apiInstance.get<Notification[]>(`/user/notificationsList`, {
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
