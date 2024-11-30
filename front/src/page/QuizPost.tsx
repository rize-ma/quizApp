import { PostForm } from '@/components/form/post/PostForm';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
export const QuizPost: FC = () => {
  return (
    <>
      <Helmet>
        <title>クイズを投稿</title>
      </Helmet>
      <PostForm />
    </>
  );
};
