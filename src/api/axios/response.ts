import type { AxiosError, AxiosResponse } from 'axios';

export interface ErrorResponse {
  message?: string;
  errorMessage?: string;
  Message?: string;
  errors?: { [key: string]: string };
  StatusCode?: number;
}

export interface CoreError {
  message: string;
  statusCode?: number;
}

export const commonResponseInterceptor = (data: AxiosResponse) => {
  return data;
};

export const commonRejectResponseInterceptor = (error: AxiosError) => {
  const responseData = error.response?.data as ErrorResponse | undefined;
  const coreErrorMessage =
    responseData?.message ||
    responseData?.errorMessage ||
    responseData?.Message ||
    error.message ||
    'Unknown error occurred!';
  const coreErrorStatusCode = error.status || error.response?.status || responseData?.StatusCode;

  const coreError: CoreError = {
    message: coreErrorMessage,
    statusCode: coreErrorStatusCode,
  };

  throw coreError;
};
