import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";

export const getAuthUsers = async () => {
	const token = getUserFromLocalStorage()?.token;
	try {
		const response = await apiInstance.get(
			`/auth/users`,
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
