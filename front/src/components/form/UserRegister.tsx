import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card/card';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { AlertCircle, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Label } from '../ui/label/label';
import { Alert, AlertTitle } from '../ui/alert/alert';

interface UserRegisterProps {
  onChangeLogin: () => void;
}

interface UserRegisterInput {
  email: string;
  password: string;
  userId: string;
  username: string;
}

const UserRegister: FC<UserRegisterProps> = ({ onChangeLogin }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<UserRegisterInput>();
  const [step, setStep] = useState(1);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [userIdErrorMessage, setUserIdErrorMessage] = useState('');
  const onClickNext = async () => {
    const isValid = await trigger(['email', 'password']);
    if (isValid) {
      setStep(2);
    }
  };
  const onClickReturn = () => {
    setStep(1);
  };
  const onSubmit = async (data: UserRegisterInput) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/auth/user-register',
      data: {
        email: data.email,
        password: data.password,
        user_id: data.userId,
        username: data.username,
      },
    })
      .then((res) => {
        const token = res.data.token.Ok;
        localStorage.setItem('authToken', token);
      })
      .catch((err) => {
        err.response.data.message === 'Registered email address'
          ? setEmailErrorMessage('使用済みのメールアドレスです')
          : setEmailErrorMessage('');

        err.response.data.message === 'Registered userId'
          ? setUserIdErrorMessage('使用済みのユーザーIDです')
          : setUserIdErrorMessage('');
      });
  };
  useEffect(() => {
    errors.email?.message
      ? setEmailErrorMessage(errors.email?.message)
      : setEmailErrorMessage('');

    errors.userId?.message
      ? setUserIdErrorMessage(errors.userId?.message)
      : setUserIdErrorMessage('');
  }, [errors.email, errors.userId]);
  return (
    <Card className="w-96">
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ユーザー登録</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className={clsx('flex flex-col', { hidden: step === 2 })}>
              <div className="w-full flex justify-center">
                <Button variant="link" onClick={onChangeLogin}>
                  ログインする
                </Button>
              </div>
              <div className="mt-12">
                <Label>メールアドレス</Label>
                <Alert
                  className={clsx('mb-1', { hidden: !emailErrorMessage })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{emailErrorMessage}</AlertTitle>
                </Alert>
                <Input
                  type="email"
                  placeholder="メールアドレスを入力"
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                  })}
                />
              </div>
              <div className="mt-12">
                <Label>パスワード</Label>
                <Alert
                  className={clsx('mb-1', {
                    hidden: !errors.password?.message,
                  })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{errors.password?.message}</AlertTitle>
                </Alert>
                <Input
                  type="password"
                  placeholder="パスワードを入力"
                  {...register('password', {
                    required: 'パスワードを入力してください',
                  })}
                />
              </div>
            </div>
            <div className={clsx('flex flex-col', { hidden: step === 1 })}>
              <div className="mt-12">
                <Label>ユーザーID</Label>
                <Alert
                  className={clsx('mb-1', {
                    hidden: !userIdErrorMessage,
                  })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{userIdErrorMessage}</AlertTitle>
                </Alert>
                <Input
                  placeholder="ユーザーIDを入力"
                  {...register('userId', {
                    required: 'ユーザーIDを入力してください',
                  })}
                />
              </div>
              <div className="mt-12">
                <Label>ユーザー名</Label>
                <Alert
                  className={clsx('mb-1', {
                    hidden: !errors.username?.message,
                  })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{errors.username?.message}</AlertTitle>
                </Alert>
                <Input
                  placeholder="ユーザー名を入力"
                  {...register('username', {
                    required: 'ユーザー名を入力してください',
                  })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div
              className={clsx('flex justify-end pt-10 w-full', {
                hidden: step === 2,
              })}
            >
              <Button onClick={onClickNext} type="button">
                <ChevronsRight size="23" color="#ffffff" strokeWidth={2} />
                次へ
              </Button>
            </div>
            <div
              className={clsx(
                'flex justify-between items-center pt-10 w-full',
                {
                  hidden: step === 1,
                },
              )}
            >
              <Button onClick={onClickReturn} type="button">
                <ChevronsLeft size="23" color="#ffffff" strokeWidth={2} />
                戻る
              </Button>
              <Button className="w-5/12" type="submit">
                登録
              </Button>
            </div>
          </CardFooter>
        </form>
      </div>
    </Card>
  );
};

export default UserRegister;
