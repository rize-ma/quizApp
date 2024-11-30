import { GetUserRes } from '../type/user';
import { api } from './axiosInstance';

export const getUserById = async (id: string): Promise<GetUserRes> => {
  return api().get(`/api/users/${id}`);
};

export const getUserByUserId = async (userId: string): Promise<GetUserRes> => {
  return api().get(`/api/users/user-id/${userId}`);
};
