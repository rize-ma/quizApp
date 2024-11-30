export type User = {
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

export interface GetUserRes {
  data: User;
}
