import axios from "axios";

export const getFetcher = (url: string) => {
  if (import.meta.env.MODE === "production") {
    url = "https://api.slack.sukwoo.kr" + url;
  }
  return axios.get(url, { withCredentials: true }).then((response) => response.data);
};
