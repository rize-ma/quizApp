import { PostInput } from '../type/quiz';
import { api } from './axiosInstance';

export const quizPost = async ({
  correctOption,
  createdBy,
  option1,
  option2,
  option3,
  option4,
  question,
}: PostInput) => {
  await api().post('/api/quizzes/', {
    correct_option: correctOption,
    created_by: createdBy,
    option1,
    option2,
    option3,
    option4,
    question,
  });
};
