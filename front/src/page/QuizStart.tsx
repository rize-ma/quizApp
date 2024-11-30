import { Button } from '@/components/ui/button/button';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export const QuizStart: FC = () => {
  return (
    <>
      <Helmet>
        <title>クイズに挑戦</title>
      </Helmet>
      <div className="w-full flex justify-center items-center">
        <Button className="w-52">
          <a href="/quiz/play">
            <span>クイズに挑戦する</span>
          </a>
        </Button>
      </div>
    </>
  );
};
