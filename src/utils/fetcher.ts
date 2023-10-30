import axios from "axios";

export const getFetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);

export const postFetcher = <TRequest>(url: string, data: TRequest) =>
  axios.post(url, data, { withCredentials: true }).then((response) => response.data);

const fetcher = {
  get: getFetcher,
  post: postFetcher,
};

export default fetcher;
