import { DataSource } from '../utils/tableData';
import { ActionList } from '@/components/quizList/ActionList';
import { ListTabel } from '@/components/quizList/ListTable';
import { notification } from 'antd';
import { SelectionSelectFn } from 'antd/es/table/interface';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const QuizList = () => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<DataSource[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onSelect: SelectionSelectFn<DataSource> = (
    _record,
    _selected,
    selectedRows,
  ) => {
    setSelectedQuizzes(selectedRows);
  };
  const onClickEdit = () => {
    switch (selectedQuizzes.length) {
      case 0:
        api.open({
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
        api.open({
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
        api.open({
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
  return (
    <div className="w-full mr-5 mt-5 lg:mr-5 lg:p-2 md:m-5 md:p-2">
      {contextHolder}
      <h1 className="text-2xl">クイズ一覧</h1>
      <div className="mt-10">
        <div className="mb-7">
          <ActionList onClickEdit={onClickEdit} />
        </div>
        <ListTabel onSelect={onSelect} />
      </div>
    </div>
  );
};
