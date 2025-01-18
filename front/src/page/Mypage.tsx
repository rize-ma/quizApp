import { Profile } from '@/components/user/Profile';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export const Mypage: FC = () => {
  return (
    <>
      <Helmet>
        <title>マイページ</title>
      </Helmet>
      <div className="w-full flex justify-center">
        <Profile />
      </div>
    </>
  );
};
