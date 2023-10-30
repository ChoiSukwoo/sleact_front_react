import { AxiosError } from "axios";

export const apiError = (error: AxiosError): string[] => {
  if (!error.response) {
    return ["error.response is undefined"];
  }

  if (typeof error.response.data !== "string") {
    const apiError = error.response.data as ApiErrorDto;

    if (typeof apiError.data !== "string") {
      return apiError.data;
    } else {
      return [apiError.data];
    }
  } else {
    return [error.response.data];
  }
};
