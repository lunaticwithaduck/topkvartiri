import type { InternalAxiosRequestConfig } from 'axios';

export const commonRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const commonRejectErrorRequestInterceptor = (error: Error) => {
  return Promise.reject(error);
};
