import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";

export const getMyNotifications = async () => {
	const token = getUserFromLocalStorage()?.token;
	try {
		const response = await apiInstance.get(
			`/user/notificationsList`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (e) {
		throw e;
	}
};
