import { Button } from '@/components/ui/button/button';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export const QuizStart: FC = () => {
  const navigate = useNavigate();
  const onClickStart = () => {
    navigate('/quiz/play');
  };
  return (
    <>
      <Helmet>
        <title>クイズに挑戦</title>
      </Helmet>
      <div className="w-full flex justify-center items-center">
        <Button className="w-52" onClick={onClickStart}>
          クイズに挑戦する
        </Button>
      </div>
    </>
  );
};
