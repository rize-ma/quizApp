import { useWindowWidth } from '../hook/windowWidth';
import { deleteQuiz } from '../api/quiz';
import {
  createColumns,
  createDataSource,
  DataSource,
} from '../utils/tableData';
import { ActionList } from '@/components/quizList/ActionList';
import { ListTabel } from '@/components/quizList/ListTable';
import { Spin } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { Check, CircleX } from 'lucide-react';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NotificationContext } from '@/components/layout/Layout';

export const QuizList: FC = () => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<DataSource[]>([]);
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [columns, setColumns] = useState<ColumnsType<DataSource>>([]);
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const width = useWindowWidth();
  const fetchDataSource = async () => {
    const fetchedData = await createDataSource(notification);
    if (fetchedData) {
      setDataSource(fetchedData);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchDataSource();
    setLoading(false);
  }, []);
  useEffect(() => {
    setColumns(createColumns(width));
  }, [width]);
  const onClickEdit = () => {
    switch (selectedQuizzes.length) {
      case 0:
        notification?.open({
          message: <p className="text-red-600">クイズが選択されていません</p>,
          description: (
            <p className="text-red-600">編集したいクイズを選択してください</p>
          ),
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
        break;
      case 1:
        navigate(`/quiz/edit/${selectedQuizzes[0].key}`);
        break;
      case 2:
        notification?.open({
          message: <p className="text-red-600">クイズが複数選択されています</p>,
          description: (
            <p className="text-red-600">
              編集したいクイズを１つ選択してください
            </p>
          ),
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
        break;
      default:
        notification?.open({
          message: <p className="text-red-600">不明なエラーが発生しました</p>,
          description: (
            <p className="text-red-600">
              再度ログインするか時間を空けてお試しください
            </p>
          ),
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
    }
  };
  const onClickDelete = async () => {
    setLoading(true);
    if (!selectedQuizzes.length) {
      notification?.open({
        message: (
          <p className="text-red-600">削除するクイズが選択されていません</p>
        ),
        description: (
          <p className="text-red-600">削除するクイズを選択してください</p>
        ),
        icon: <CircleX size={28} color="#ff0000" />,
        placement: 'top',
      });
      return;
    }
    const quizIds = selectedQuizzes.map((quiz) => quiz.key);
    try {
      await deleteQuiz(quizIds);
      notification?.open({
        message: 'クイズが削除されました',
        icon: <Check size={28} color="#00ff33" />,
        placement: 'top',
      });
      setSelectedQuizzes([]);
      fetchDataSource();
    } catch {
      notification?.open({
        message: <p className="text-red-600">クイズの削除が失敗しました</p>,
        description: (
          <p className="text-red-600">
            時間を開けるか再度ログインし直してお試しください
          </p>
        ),
        icon: <CircleX size={28} color="#ff0000" />,
        placement: 'top',
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>クイズ一覧</title>
      </Helmet>
      <div className="w-full mr-5 mt-5 lg:mr-5 lg:p-2 md:m-5 md:p-2">
        {isLoading && <Spin fullscreen tip="Loading..." size="large" />}
        <h1 className="text-2xl">クイズ一覧</h1>
        <div className="mt-10">
          <div className="mb-7">
            <ActionList
              selectedQuizzes={selectedQuizzes}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          </div>
          <ListTabel
            columns={columns}
            dataSource={dataSource}
            setSelectedQuizzes={setSelectedQuizzes}
          />
        </div>
      </div>
    </>
  );
};
