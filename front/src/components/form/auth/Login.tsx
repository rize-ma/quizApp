import { FC, useState } from 'react';
import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card/card';
import { useForm } from 'react-hook-form';
import { Label } from '../../ui/label/label';
import { Alert, AlertTitle } from '../../ui/alert/alert';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { LoginInput } from '../../../type/auth';
import { login } from '../../../api/auth';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onChangeRegister: () => void;
}

export const Login: FC<LoginProps> = ({ onChangeRegister }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>();
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const onSubmit = async (input: LoginInput) => {
    try {
      await login(input);
      navigate('/quiz/start');
    } catch (err) {
      if (!isAxiosError(err)) {
        return;
      }
      if (
        err.response?.data?.message === 'Email address does not exist' ||
        err.response?.data?.message === 'Password is incorrect'
      ) {
        setLoginErrorMessage('メールアドレスまたはパスワードが間違っています');
        return;
      }
      setLoginErrorMessage(
        'サーバーで問題が発生しました。時間をおいて再度お試しください。',
      );
    }
  };
  return (
    <Card className="w-96">
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ログイン</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col">
              <div className="w-full flex flex-col justify-center">
                <Button variant="link" onClick={onChangeRegister}>
                  ユーザー登録する
                </Button>
                <Alert
                  className={clsx('mt-1', { hidden: !loginErrorMessage })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{`${loginErrorMessage}`}</AlertTitle>
                </Alert>
              </div>
              <div className="mt-12">
                <Label>メールアドレス</Label>
                <Alert
                  className={clsx('mb-1', { hidden: !errors.email?.message })}
                  variant="error"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{`${errors.email?.message}`}</AlertTitle>
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
                  <AlertTitle>{`${errors.password?.message}`}</AlertTitle>
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
          </CardContent>
          <CardFooter>
            <div className="pt-10 w-full">
              <Button className="w-full" type="submit">
                ログイン
              </Button>
            </div>
          </CardFooter>
        </form>
      </div>
    </Card>
  );
};
