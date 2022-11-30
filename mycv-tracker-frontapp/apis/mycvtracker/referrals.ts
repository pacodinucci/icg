import { apiInstance } from "./config";
import { getUserFromLocalStorage } from "../../utils/storage-utils";

export const getMyReferrals = async (page:number, noOfRecords: number) => {
	const token = getUserFromLocalStorage()?.token;
	try {
		const response = await apiInstance.get(
			`/links/referrals?page=${page}&noOfRecords=${noOfRecords}`,
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
