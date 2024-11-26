import { Options } from '../../type/quiz';
import { HttpResponse, http } from 'msw';
import { POST_QUIZ } from '../constants';

export const handlers = [
  http.post('http://127.0.0.1:8080/api/quizzes/', async ({ request }) => {
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
];
