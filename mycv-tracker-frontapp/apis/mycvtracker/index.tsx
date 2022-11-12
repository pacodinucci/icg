import { default as axios } from "axios";

const baseURL = process.env.NEXT_PUBLIC_MYCVTRACKER_API_HOST;

const apiInstance = axios.create({
  baseURL,
});

const getVersion = async (): Promise<void> => {
  // make a api call here
};

export { getVersion };
