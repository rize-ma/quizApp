import { UserRegisterInput, LoginInput } from '../type/auth';
import { api } from './axiosInstance';

export const userRegister = async ({
  email,
  password,
  userId,
  username,
}: UserRegisterInput) => {
  const res = await api.post('/auth/user-register', {
    email: email,
    password: password,
    user_id: userId,
    username: username,
  });

  const token = res.data.token.Ok;
  localStorage.setItem('authToken', token);
};

export const login = async ({ email, password }: LoginInput) => {
  const res = await api.post('/auth/login', {
    email: email,
    password: password,
  });
  const token = res.data.token.Ok;
  localStorage.setItem('authToken', token);
};
