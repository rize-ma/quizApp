import { FC } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card/card';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label/label';
import { Alert, AlertTitle } from '../ui/alert/alert';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import axios from 'axios';

interface LoginProps {
  onChangeRegister: () => void;
}

interface LoginInput {
  email: string;
  password: string;
}

const Login: FC<LoginProps> = ({ onChangeRegister }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>();
  const onSubmit = (data: LoginInput) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/auth/login',
      data: data,
    }).then((res) => console.log(res));
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
              <div className="w-full flex justify-center">
                <Button variant="link" onClick={onChangeRegister}>
                  ユーザー登録する
                </Button>
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

export default Login;
