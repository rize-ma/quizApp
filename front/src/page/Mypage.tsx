import { User } from '../type/user';
import { getUserById } from '../api/user';
import { Profile } from '@/components/user/Profile';
import { FC, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CircleX } from 'lucide-react';
import { NotificationContext } from '@/components/layout/Layout';

export const Mypage: FC = () => {
  const [user, setUser] = useState<User>();
  const notification = useContext(NotificationContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error();
        }
        const res = await getUserById(userId);
        setUser(res);
      } catch {
        notification?.open({
          message: (
            <p className="text-red-600">ユーザー情報が取得できませんでした</p>
          ),
          description: (
            <p className="text-red-600">
              再度ログインするか時間を空けてお試しください
            </p>
          ),
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
      }
    };
    loadUser();
  }, []);
  return (
    <>
      <Helmet>
        <title>マイページ</title>
      </Helmet>
      <div className="w-full flex justify-center">
        <Profile user={user} />
      </div>
    </>
  );
};
