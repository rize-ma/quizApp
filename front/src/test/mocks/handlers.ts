import { Options } from '../../type/quiz';
import { HttpResponse, http } from 'msw';
import { EDIT_QUIZ, POST_QUIZ } from '../constants';

const baseURL = import.meta.env.VITE_API_BASE;

export const handlers = [
  http.post(`${baseURL}/api/quizzes/`, async ({ request }) => {
    const {
      correct_option,
      created_by,
      option1,
      option2,
      option3,
      option4,
      question,
    } = (await request.json()) as {
      correct_option?: Options;
      created_by?: string;
      option1?: string;
      option2?: string;
      option3?: string;
      option4?: string;
      question?: string;
    };
    const {
      CORRECT_OPTION,
      CREATED_BY,
      OPTION1,
      OPTION2,
      OPTION3,
      OPTION4,
      QUESTION,
    } = POST_QUIZ;
    if (
      correct_option === CORRECT_OPTION &&
      created_by === CREATED_BY &&
      option1 === OPTION1 &&
      option2 === OPTION2 &&
      option3 === OPTION3 &&
      option4 === OPTION4 &&
      question === QUESTION
    ) {
      return HttpResponse.json(
        {
          correct_option,
          created_by,
          option1,
          option2,
          option3,
          option4,
          question,
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(null, { status: 404 });
    }
  }),
  http.put(`${baseURL}/api/quizzes/`, async ({ request }) => {
    const { id, correct_option, option1, option2, option3, option4, question } =
      (await request.json()) as {
        id?: string;
        correct_option?: Options;
        option1?: string;
        option2?: string;
        option3?: string;
        option4?: string;
        question?: string;
      };
    const { ID, CORRECT_OPTION, OPTION1, OPTION2, OPTION3, OPTION4, QUESTION } =
      EDIT_QUIZ;
    if (
      id === ID &&
      correct_option === CORRECT_OPTION &&
      option1 === OPTION1 &&
      option2 === OPTION2 &&
      option3 === OPTION3 &&
      option4 === OPTION4 &&
      question === QUESTION
    ) {
      return HttpResponse.json(
        {
          id,
          correct_option,
          option1,
          option2,
          option3,
          option4,
          question,
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(null, { status: 404 });
    }
  }),
];
