import { PostForm } from '@/components/form/post/PostForm';
import { Helmet } from 'react-helmet-async';
export const QuizPost = () => {
  return (
    <>
      <Helmet>
        <title>クイズを投稿</title>
      </Helmet>
      <PostForm />
    </>
  );
};
