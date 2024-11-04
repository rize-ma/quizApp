import { useState } from 'react';
import UserRegister from '../components/form/UserRegister';
import Login from '@/components/form/Login';
import { clsx } from 'clsx';

const Auth = () => {
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

export default Auth;
