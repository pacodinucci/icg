import { apiInstance } from "./config";

export const submitAnswer = async (formData:FormData ) => {
	try {
		const response = await apiInstance.post(
			`/interviews/answer`,
            formData, 
            {
                headers: {
                "Content-Type":'multipart/form-data'
            }
        }
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (e) {
		throw e;
	}
};

export const completeInterview = async (formData: FormData) => {
    try {
		const response = await apiInstance.post(
			`/interviews/complete`,
            formData, 
            {
                headers: {
                "Content-Type":'multipart/form-data'
            }
        }
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (e) {
		throw e;
	}
}