export interface Quiz {
  id: string;
  correct_option: number;
  created_by: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
  created_at?: Date;
  updated_at?: Date;
}

export type Options = 1 | 2 | 3 | 4;

export interface PostInput {
  correctOption: Options;
  createdBy: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
}
