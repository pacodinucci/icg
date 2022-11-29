import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";

export const getNotes = async (pageNumber: number, pageSize: number) => {
	const token = getUserFromLocalStorage()?.token;
	try {
		const response = await apiInstance.get(
			`/user/notesList/${pageNumber}/${pageSize}`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return response.data.content;
		}
	} catch (e) {
		throw e;
	}
};
