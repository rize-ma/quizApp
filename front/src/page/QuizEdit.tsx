import { getQuizById } from '../api/quiz';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditInput } from '../type/quiz';
import { Spin } from 'antd';
import { CircleX } from 'lucide-react';
import { EditForm } from '@/components/form/edit/EditForm';
import { Helmet } from 'react-helmet-async';
import { NotificationContext } from '@/components/layout/Layout';

export const QuizEdit: FC = () => {
  const { quizId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [defaultQuiz, setDefaultQuiz] = useState<EditInput>();
  const notification = useContext(NotificationContext);
  useEffect(() => {
    setLoading(true);
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
          } = res.data;
          setDefaultQuiz({
            id,
            correctOption: correct_option,
            option1,
            option2,
            option3,
            option4,
            question,
          });
        } catch {
          notification?.open({
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
    setLoading(false);
  }, []);
  if (isLoading || defaultQuiz === undefined) {
    return <Spin fullscreen tip="Loading..." size="large" />;
  }
  return (
    <>
      <Helmet>
        <title>クイズ編集</title>
      </Helmet>
      <EditForm defaultQuiz={defaultQuiz} />
    </>
  );
};
