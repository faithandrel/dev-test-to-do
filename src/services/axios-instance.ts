import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export enum AxiosMethods {
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET'
}

interface AxiosProps {
  endpoint: string;
  params?: any;
  method: AxiosMethods;
  body?: any;
}

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.token}`;
  // eslint-disable-next-line no-param-reassign
  config.baseURL = process.env.API_BASE_URL;
  return config;
});

axios.interceptors.response.use(response => {
  if (response?.data?.Errors) {
    const errorMessage =
      response?.data?.Errors?.data_error?.errors[0] ||
      'Something went wrong, please try again later';
    throw new AxiosError(errorMessage, '400', undefined, undefined, {
      ...response,
      data: errorMessage
    });
  }

  return response;
});

export async function axiosHelper({
  endpoint,
  method,
  params,
  body,
  ...rest
}: AxiosProps) {
  if (endpoint.includes('undefined'))
    // eslint-disable-next-line no-param-reassign
    endpoint = endpoint.replace('undefined', '');

  return axios(endpoint, {
    method,
    data: body,
    params,
    ...rest
  }).then(response => response.data);
}
