import { GetUserRes, User } from '../type/user';
import { api } from './axiosInstance';
import { EditUserInput } from '../type/user';

export const getUserById = async (id: string): Promise<User> => {
  const res: GetUserRes = await api().get(`/api/users/${id}`);
  if (!res.data) {
    throw new Error();
  }
  const {
    id: dataId,
    correct_answers_count,
    email,
    icon_url,
    self_introduction,
    user_id,
    username,
    created_at,
    updated_at,
  } = res.data;
  const user: User = {
    id: dataId,
    correctAnswersCount: correct_answers_count,
    email,
    iconUrl: icon_url,
    selfIntroduction: self_introduction,
    userId: user_id,
    username: username,
    createdAt: created_at,
    updatedAt: updated_at,
  };
  return user;
};

export const getUserByUserId = async (userId: string): Promise<User> => {
  const res: GetUserRes = await api().get(`/api/users/user-id/${userId}`);
  if (!res.data) {
    throw new Error();
  }
  const {
    id: dataId,
    correct_answers_count,
    email,
    icon_url,
    self_introduction,
    user_id,
    username,
    created_at,
    updated_at,
  } = res.data;
  const user: User = {
    id: dataId,
    correctAnswersCount: correct_answers_count,
    email,
    iconUrl: icon_url,
    selfIntroduction: self_introduction,
    userId: user_id,
    username: username,
    createdAt: created_at,
    updatedAt: updated_at,
  };
  return user;
};

export const editUser = async ({
  id,
  iconUrl,
  selfIntroduction,
  username,
}: EditUserInput) => {
  await api().put('/api/users', {
    id,
    icon_url: iconUrl,
    self_introduction: selfIntroduction,
    username,
  });
};
