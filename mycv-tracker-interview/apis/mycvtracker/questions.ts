import { apiInstance } from "./config";

export const getMyQuestions = async (token: string, interviewType:string ) => {
	try {
		const response = await apiInstance.get(
			`/interviews/questions?token=${token}&interviewType=${interviewType}`,
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (e) {
		throw e;
	}
};
