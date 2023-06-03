import axios from "axios";

const baseURL = 'https://mycvtracker.com:8080';

 //process.env.NEXT_PUBLIC_MYCVTRACKER_API_HOST;

export const apiInstance = axios.create({
  baseURL,
});
