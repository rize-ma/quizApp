import { UserRegisterInput, LoginInput } from '../type/auth';
import { api } from './axiosInstance';

export const userRegister = async ({
  email,
  password,
  userId,
  username,
}: UserRegisterInput) => {
  const res = await api().post('/auth/user-register', {
    email,
    password,
    user_id: userId,
    username,
  });
  localStorage.setItem('userId', res.data.user.id);
  localStorage.setItem('authToken', res.data.token.Ok);
};

export const login = async ({ email, password }: LoginInput) => {
  const res = await api().post('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('userId', res.data.user.id);
  localStorage.setItem('authToken', res.data.token.Ok);
};
