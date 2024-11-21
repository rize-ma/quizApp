import { isAxiosError } from 'axios';
import { getQuizzesByUserId } from '../api/quiz';
import { Quiz } from '../type/quiz';
import { NotificationInstance } from 'antd/es/notification/interface';
import { CircleX } from 'lucide-react';
import { ColumnsType } from 'antd/es/table';

export interface DataSource {
  key: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export const createDataSource = async (notification: NotificationInstance) => {
  try {
    const quizzes: Quiz[] = (await getQuizzesByUserId()).data;
    const dataSource: DataSource[] = quizzes.map(
      ({ id, question, option1, option2, option3, option4 }) => {
        return {
          key: id,
          question,
          option1,
          option2,
          option3,
          option4,
        };
      },
    );
    return dataSource;
  } catch (err) {
    if (!isAxiosError(err)) {
      return;
    }
    notification.open({
      message: <p className="text-red-600">クイズの取得に失敗しました</p>,
      description: (
        <p className="text-red-600">
          時間を開けるか再度ログインし直してお試しください
        </p>
      ),
      icon: <CircleX size={28} color="#ff0000" />,
      placement: 'top',
    });
  }
};

export const createColumns = (windowWidth: number) => {
  const isMobile = windowWidth <= 740;
  const columns: ColumnsType<DataSource> = [
    {
      key: 'question',
      title: '問題文',
      dataIndex: 'question',
      width: 1000,
    },
    {
      key: 'option1',
      title: '選択肢1',
      dataIndex: 'option1',
      hidden: isMobile,
      width: 200,
    },
    {
      key: 'option2',
      title: '選択肢2',
      dataIndex: 'option2',
      hidden: isMobile,
      width: 200,
    },
    {
      key: 'option3',
      title: '選択肢3',
      dataIndex: 'option3',
      hidden: isMobile,
      width: 200,
    },
    {
      key: 'option4',
      title: '選択肢4',
      dataIndex: 'option4',
      hidden: isMobile,
      width: 200,
    },
  ];

  return columns;
};
