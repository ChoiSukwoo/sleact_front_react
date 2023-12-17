import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const useAxiosPost = () => {
  const postRequest = (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
    return axios
      .post(url, data, config)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response && isApiErrorDto(error.response.data)) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(undefined);
        }
      });
  };

  return postRequest;
};

// ApiErrorDto 타입을 확인하는 함수
function isApiErrorDto(object: any): object is ApiErrorDto {
  return (
    object &&
    typeof object.success === "boolean" &&
    typeof object.statusCode === "number" &&
    Array.isArray(object.message)
  );
}

export default useAxiosPost;
