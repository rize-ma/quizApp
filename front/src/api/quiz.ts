import { EditInput, GetQuizRes, GetQuizzesRes, PostInput } from '../type/quiz';
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

export const getQuizzesByUserId = async (): Promise<GetQuizzesRes> => {
  const userId = localStorage.getItem('userId');
  return await api().get(`/api/quizzes/user/${userId}`);
};

export const getQuizById = async (quizId: string): Promise<GetQuizRes> => {
  return api().get(`/api/quizzes/${quizId}`);
};

export const getQuizzesRandom = async (
  count: number,
): Promise<GetQuizzesRes> => {
  return api().get(`/api/quizzes/random/${count}`);
};

export const editQuiz = async ({
  id,
  correctOption,
  option1,
  option2,
  option3,
  option4,
  question,
}: EditInput) => {
  await api().put('/api/quizzes/', {
    id,
    correct_option: correctOption,
    option1,
    option2,
    option3,
    option4,
    question,
  });
};

export const deleteQuiz = async (quizIds: string[]) => {
  await api().delete('/api/quizzes/', {
    data: quizIds,
  });
};
