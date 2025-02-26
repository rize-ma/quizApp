export const USER_ID = 'tset-user';
export const QUIZ_ID = 'test-quiz';

export const POST_QUIZ = {
  CORRECT_OPTION: 1,
  CREATED_BY: USER_ID,
  OPTION1: '選択肢1',
  OPTION2: '選択肢2',
  OPTION3: '選択肢3',
  OPTION4: '選択肢4',
  QUESTION: '問題文',
} as const;

export const EDIT_QUIZ = {
  ID: QUIZ_ID,
  CORRECT_OPTION: 2,
  OPTION1: '選択肢1',
  OPTION2: '選択肢2',
  OPTION3: '選択肢3',
  OPTION4: '選択肢4',
  QUESTION: '問題文',
} as const;
