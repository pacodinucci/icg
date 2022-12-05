import { Question } from "../../types/question_types";
import { apiInstance } from "./config";

export const getMyQuestions = async (token: string, interviewType: string) => {
  try {
    const response = await apiInstance.get(`/interviews/questions?token=${token}&interviewType=${interviewType}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};

export const sendAddQuestion = async (token: string, question: Omit<Question, "id">) => {};

export const GetQuestionsList = async (token: string, type: string) => {
  try {
    const response = await apiInstance.get(`/interviews/questionslist?interviewType=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};
export const sendEditQuestion = async (token: string, question: Question) => {
  try {
    const response = await apiInstance.put(`/interviews/editQuestion`, question, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};

export const sendDeleteQuestion = async (token: string, question: Question) => {
  try {
    const response = await apiInstance.put(`/interviews/deleteQuestion`, question, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};
