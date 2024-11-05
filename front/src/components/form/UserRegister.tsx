import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card/card';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';

interface UserRegisterProps {
  onChangeLogin: () => void;
}

const UserRegister: FC<UserRegisterProps> = ({ onChangeLogin }) => {
  const [step, setStep] = useState(1);
  const onClickNext = () => {
    setStep(2);
  };
  const onClickReturn = () => {
    setStep(1);
  };
  return (
    <Card className="w-96">
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ユーザー登録</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={clsx('flex flex-col', { hidden: step === 2 })}>
            <div className="w-full flex justify-center">
              <Button variant="link" onClick={onChangeLogin}>
                ログインする
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
          <div className={clsx('flex flex-col', { hidden: step === 1 })}>
            <Input className="mt-12" placeholder="ユーザーIDを入力" />
            <Input className="mt-10" placeholder="ユーザー名を入力" />
          </div>
        </CardContent>
        <CardFooter>
          <div
            className={clsx('flex justify-end pt-10 w-full', {
              hidden: step === 2,
            })}
          >
            <Button onClick={onClickNext}>
              <ChevronsRight size="23" color="#ffffff" strokeWidth={2} />
              次へ
            </Button>
          </div>
          <div
            className={clsx('flex justify-between items-center pt-10 w-full', {
              hidden: step === 1,
            })}
          >
            <Button onClick={onClickReturn}>
              <ChevronsLeft size="23" color="#ffffff" strokeWidth={2} />
              戻る
            </Button>
            <Button className="w-5/12" type="submit">
              登録
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default UserRegister;
