import { FC, useState } from 'react';
import { UserRegister } from '../components/form/auth/UserRegister';
import { Login } from '@/components/form/auth/Login';
import { clsx } from 'clsx';
import { Helmet } from 'react-helmet-async';

export const Auth: FC = () => {
  type FormType = 'login' | 'register';
  const [activeForm, setActiveForm] = useState<FormType>('login');
  const onChangeRegister = () => {
    setActiveForm('register');
  };
  const onChangeLogin = () => {
    setActiveForm('login');
  };
  return (
    <>
      <Helmet>
        <title>{activeForm === 'login' ? 'ログイン' : 'ユーザー登録'}</title>
      </Helmet>
      <div
        className={clsx('flex items-center justify-center h-screen', {
          hidden: activeForm === 'register',
        })}
      >
        <Login onChangeRegister={onChangeRegister} />
      </div>
      <div
        className={clsx('flex items-center justify-center h-screen', {
          hidden: activeForm === 'login',
        })}
      >
        <UserRegister onChangeLogin={onChangeLogin} />
      </div>
    </>
  );
};
