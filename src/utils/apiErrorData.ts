import { AxiosError } from "axios";

export const apiError = (error: AxiosError): string[] => {
  if (!error.response) {
    return ["error.response is undefined"];
  }

  if (typeof error.response.data !== "string") {
    const apiError = error.response.data as ApiErrorDto;

    if (typeof apiError.message !== "string") {
      return apiError.message;
    } else {
      return [apiError.message];
    }
  } else {
    return [error.response.data];
  }
};
