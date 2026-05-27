import axios, { AxiosHeaders } from 'axios';
import { commonRejectErrorRequestInterceptor, commonRequestInterceptor } from './request';
import { commonRejectResponseInterceptor, commonResponseInterceptor } from './response';

const headers = new AxiosHeaders();
headers.setAccept('application/json');

const instance = axios.create({
  headers,
  responseType: 'json',
  withCredentials: true,
});

instance.interceptors.request.use(commonRequestInterceptor, commonRejectErrorRequestInterceptor);
instance.interceptors.response.use(commonResponseInterceptor, commonRejectResponseInterceptor);

export const axiosInstance = instance;
