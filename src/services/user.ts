import { axiosHelper, AxiosMethods } from './axios-instance';
import { User } from '../interfaces';

// Bypass CORS
export const API_ENDPOINT =
  'https://cors-anywhere.herokuapp.com/https://api-nodejs-todolist.herokuapp.com';

export const register = async (params: User) => {
  return await axiosHelper({
    endpoint: `${API_ENDPOINT}/user/register`,
    method: AxiosMethods.POST,
    body: params
  });
};
