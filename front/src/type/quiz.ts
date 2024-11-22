export type Options = 1 | 2 | 3 | 4;

export interface Quiz {
  id: string;
  correct_option: Options;
  created_by: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface GetQuizzesRes {
  data: Quiz[];
}

export interface PostInput {
  correctOption: Options;
  createdBy: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
}

export interface EditInput {
  id: string;
  correctOption: Options;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
}

export interface DeleteInput {
  id: string;
}
