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
