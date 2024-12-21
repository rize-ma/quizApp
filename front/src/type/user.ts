export type User = {
  id: string;
  correctAnswersCount?: number;
  email: string;
  iconUrl?: string;
  selfIntroduction?: string;
  userId: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface GetUserRes {
  data: {
    id: string;
    correct_answers_count?: number;
    email: string;
    icon_url?: string;
    self_introduction?: string;
    user_id: string;
    username: string;
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface EditUserInput {
  id: string;
  iconUrl?: string;
  selfIntroduction?: string;
  username?: string;
}
