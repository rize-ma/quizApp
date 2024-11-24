import { Button } from '@/components/ui/button/button';
import { getQuizzes } from '../api/quiz';
import { Quiz } from '../type/quiz';
import { QuizItem } from '@/components/quizPlay/quizItem';
import { notification } from 'antd';
import { isAxiosError } from 'axios';
import { clsx } from 'clsx';
import { CircleX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const QuizPlay = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const onClickNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };
  const finishMessage = useMemo(() => {
    if (currentQuestion < 10) return null; // メッセージを表示しない条件
    if (correctCount === 10) return '完璧！！';
    if (correctCount >= 7) return 'すごい！';
    if (correctCount >= 4) return 'ナイス';
    return 'がんばろう...';
  }, [currentQuestion, correctCount]);
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const res = await getQuizzes(10);
        setQuizzes(res.data);
      } catch (err) {
        if (!isAxiosError(err)) {
          return;
        }
        api.open({
          message: <p className="text-red-600">クイズの取得に失敗しました</p>,
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
      }
    };
    loadQuizzes();
  }, []);
  return (
    <>
      <Helmet>
        <title>クイズに挑戦中</title>
      </Helmet>
      {contextHolder}
      <div className="bg-black-opacity-80 w-full h-screen text-white">
        {quizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className={clsx('w-full h-screen', {
              hidden: index + 1 !== currentQuestion,
            })}
          >
            <QuizItem
              quiz={quiz}
              setCorrectCount={setCorrectCount}
              onClickNext={onClickNext}
              currentQuestion={currentQuestion}
            />
          </div>
        ))}
        <div
          className={clsx('pt-20 w-full flex justify-center', {
            hidden: !(currentQuestion > 10),
          })}
        >
          <div className="bg-zinc-900 w-80 p-5 rounded-md">
            <div>
              <span>10問中...</span>
            </div>
            <div className="ml-14 mt-5 text-2xl">
              <span className="font-bold">{correctCount}問</span>
              <span> 正解！</span>
            </div>
            <div className="flex justify-center w-full text-2xl mt-20">
              <span className="font-extrabold">{finishMessage}</span>
            </div>
            <div className="mt-24">
              <a href="/quiz/start">
                <Button className="w-full">
                  <span>ホームに戻る</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
