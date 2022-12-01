import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";

export const getMySkills = async () => {
	const token = getUserFromLocalStorage()?.token;
	try {
		const response = await apiInstance.get(
			`/tech-skills/list/`,
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
