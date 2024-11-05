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

interface LoginProps {
  onChangeRegister: () => void;
}

const Login: FC<LoginProps> = ({ onChangeRegister }) => {
  return (
    <Card className="w-96">
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="w-full flex justify-center">
              <Button variant="link" onClick={onChangeRegister}>
                ユーザー登録する
              </Button>
            </div>
            <Input
              className="mt-12"
              type="email"
              placeholder="メールアドレスを入力"
            />
            <Input
              className="mt-10"
              type="password"
              placeholder="パスワードを入力"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="pt-10 w-full">
            <Button className="w-full" type="submit">
              登録
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Login;
