import { FC } from 'react';
import { Button } from '../ui/button/button';

interface LoginProps {
  onChangeRegister: () => void;
}

const Login: FC<LoginProps> = ({ onChangeRegister }) => {
  return (
    <>
      <div>ログインフォーム</div>
      <div className="w-full flex justify-center">
        <Button variant="link" onClick={onChangeRegister}>
          ユーザー登録する
        </Button>
      </div>
    </>
  );
};

export default Login;
