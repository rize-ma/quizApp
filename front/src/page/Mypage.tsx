import { Profile } from '@/components/user/Profile';
import { Helmet } from 'react-helmet-async';

export const Mypage = () => {
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
