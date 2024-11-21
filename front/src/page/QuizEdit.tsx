import { isAxiosError } from 'axios';
import { getQuizById } from '../api/quiz';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditInput } from '../type/quiz';
import { notification } from 'antd';
import { CircleX } from 'lucide-react';
import { EditForm } from '@/components/form/edit/EditForm';

export const QuizEdit: FC = () => {
  const { quizId } = useParams();
  const [defaultQuiz, setDefaultQuiz] = useState<EditInput>();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const getQuiz = async () => {
      if (quizId) {
        try {
          const res = await getQuizById(quizId);
          const {
            id,
            correct_option,
            option1,
            option2,
            option3,
            option4,
            question,
          } = res.data[0];
          setDefaultQuiz({
            id,
            correctOption: correct_option,
            option1,
            option2,
            option3,
            option4,
            question,
          });
        } catch (err) {
          if (!isAxiosError(err)) {
            return;
          }
          api.open({
            message: (
              <p className="text-red-600">編集するクイズが見つかりません</p>
            ),
            description: (
              <p className="text-red-600">
                再度ログインするか時間を空けてお試しください
              </p>
            ),
            icon: <CircleX size={28} color="#ff0000" />,
            placement: 'top',
          });
        }
      }
    };
    getQuiz();
  }, []);
  if (!defaultQuiz) {
    return <div>ロード中</div>;
  }
  return (
    <>
      {contextHolder}
      <EditForm defaultQuiz={defaultQuiz} notification={api} />
    </>
  );
};
