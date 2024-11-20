import { ListTabel } from '@/components/quizList/ListTable';

export const QuizList = () => {
  return (
    <div className="w-full mr-5 mt-5 lg:mr-5 lg:p-2 md:m-5 md:p-2">
      <h1 className="text-2xl">クイズ一覧</h1>
      <div className="mt-10">
        <ListTabel />
      </div>
    </div>
  );
};
