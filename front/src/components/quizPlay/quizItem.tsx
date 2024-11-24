import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button } from '../ui/button/button';
import { Options, Quiz } from '../../type/quiz';
import { clsx } from 'clsx';

interface QuizItemProps {
  quiz: Quiz;
  setCorrectCount: Dispatch<SetStateAction<number>>;
  onClickNext: () => void;
  currentQuestion: number;
}

export const QuizItem: FC<QuizItemProps> = ({
  quiz,
  setCorrectCount,
  onClickNext,
  currentQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Options>();
  const handleAnswerClick = (option: Options) => {
    if (selectedAnswer) {
      return;
    }
    setSelectedAnswer(option);
    if (quiz.correct_option === option) {
      setCorrectCount((prev) => prev + 1);
    }
  };
  const isCorrect = (option: Options) => {
    return Boolean(selectedAnswer) && quiz.correct_option === option;
  };
  const isIncorrect = (option: Options) => {
    return selectedAnswer === option && selectedAnswer !== quiz.correct_option;
  };
  return (
    <>
      <div className="pt-20 w-full flex justify-center">
        <div className="bg-zinc-900 w-10/12 p-5 rounded-md">
          <div className="mb-2">{`問 ${currentQuestion}`}</div>
          <span>{quiz.question}</span>
        </div>
      </div>
      <div className="flex justify-center  w-full mt-40">
        <div
          className="w-10/12 mx-auto grid gap-4
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4"
        >
          <Button
            className={clsx('w-full h-auto', {
              'bg-lime-400 hover:bg-lime-400/75': isCorrect(1),
              'bg-red-600 hover:bg-red-600/75': isIncorrect(1),
            })}
            onClick={() => {
              handleAnswerClick(1);
            }}
          >
            <span className="break-words text-center whitespace-normal">
              {quiz.option1}
            </span>
          </Button>
          <Button
            className={clsx('w-full h-auto', {
              'bg-lime-400 hover:bg-lime-400/75': isCorrect(2),
              'bg-red-600 hover:bg-red-600/75': isIncorrect(2),
            })}
            onClick={() => {
              handleAnswerClick(2);
            }}
          >
            <span className="break-words text-center whitespace-normal">
              {quiz.option2}
            </span>
          </Button>
          <Button
            className={clsx('w-full h-auto', {
              'bg-lime-400 hover:bg-lime-400/75': isCorrect(3),
              'bg-red-600 hover:bg-red-600/75': isIncorrect(3),
            })}
            onClick={() => {
              handleAnswerClick(3);
            }}
          >
            <span className="break-words text-center whitespace-normal">
              {quiz.option3}
            </span>
          </Button>
          <Button
            className={clsx('w-full h-auto', {
              'bg-lime-400 hover:bg-lime-400/75': isCorrect(4),
              'bg-red-600 hover:bg-red-600/75': isIncorrect(4),
            })}
            onClick={() => {
              handleAnswerClick(4);
            }}
          >
            <span className="break-words text-center whitespace-normal">
              {quiz.option4}
            </span>
          </Button>
        </div>
      </div>
      <div
        className={clsx('w-full mt-40 flex justify-center', {
          hidden: Boolean(!selectedAnswer),
        })}
      >
        <div className="flex justify-end w-10/12">
          <Button className="w-40" onClick={onClickNext}>
            次へ進む
          </Button>
        </div>
      </div>
    </>
  );
};
