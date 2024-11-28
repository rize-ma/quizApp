import { USER_ID, QUIZ_ID, EDIT_QUIZ } from '../../../test/constants';
import { EditForm } from './EditForm';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { EditInput } from '../../../type/quiz';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const defaultQuiz: EditInput = {
  id: QUIZ_ID,
  correctOption: 1,
  option1: '選択肢1初期値',
  option2: '選択肢2初期値',
  option3: '選択肢3初期値',
  option4: '選択肢4初期値',
  question: '問題文初期値',
};

const EditFormWithNotification: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <EditForm defaultQuiz={defaultQuiz} notification={api} />
    </>
  );
};

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('antd', () => {
  const mockNotificationApi = {
    open: vi.fn(),
  };

  return {
    notification: {
      useNotification: vi.fn(() => [
        mockNotificationApi,
        <div key="contextHolder" />,
      ]),
    },
  };
});

vi.mock('../../../api/quiz', () => ({
  editQuiz: vi.fn().mockResolvedValue({ success: true }),
}));

describe('クイズ編集フォーム', () => {
  beforeEach(() => {
    localStorage.setItem('userId', USER_ID);
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('初期値が入力されている', async () => {
    render(<EditFormWithNotification />);

    const question = screen.getByDisplayValue(defaultQuiz.question);
    expect(question).toBeInTheDocument();

    const option1 = screen.getByDisplayValue(defaultQuiz.option1);
    expect(option1).toBeInTheDocument();

    const option2 = screen.getByDisplayValue(defaultQuiz.option2);
    expect(option2).toBeInTheDocument();

    const option3 = screen.getByDisplayValue(defaultQuiz.option3);
    expect(option3).toBeInTheDocument();

    const option4 = screen.getByDisplayValue(defaultQuiz.option4);
    expect(option4).toBeInTheDocument();

    const correctCheckbox =
      screen.getAllByRole('checkbox')[defaultQuiz.correctOption - 1];
    expect(correctCheckbox).toBeChecked();
  });

  test('正常にクイズを編集できる', async () => {
    const user = userEvent.setup();
    render(<EditFormWithNotification />);
    const mockNavigate = vi.fn();
    const mockEditQuiz = (await import('../../../api/quiz')).editQuiz;
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate,
    );
    const { CORRECT_OPTION, OPTION1, OPTION2, OPTION3, OPTION4, QUESTION } =
      EDIT_QUIZ;

    const question = screen.getByDisplayValue(defaultQuiz.question);
    await userEvent.clear(question);
    await user.type(question, QUESTION);

    const option1 = screen.getByDisplayValue(defaultQuiz.option1);
    await userEvent.clear(option1);
    await user.type(option1, OPTION1);

    const option2 = screen.getByDisplayValue(defaultQuiz.option2);
    await userEvent.clear(option2);
    await user.type(option2, OPTION2);

    const option3 = screen.getByDisplayValue(defaultQuiz.option3);
    await userEvent.clear(option3);
    await user.type(option3, OPTION3);

    const option4 = screen.getByDisplayValue(defaultQuiz.option4);
    await userEvent.clear(option4);
    await user.type(option4, OPTION4);

    const correctCheckbox = screen.getAllByRole('checkbox')[CORRECT_OPTION - 1];
    await user.click(correctCheckbox);

    const submitButton = screen.getByRole('button', { name: /編集完了/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockEditQuiz).toHaveBeenCalledWith({
        id: QUIZ_ID,
        correctOption: CORRECT_OPTION,
        option1: OPTION1,
        option2: OPTION2,
        option3: OPTION3,
        option4: OPTION4,
        question: QUESTION,
      });

      const [mockNotificationApi] = notification.useNotification();
      expect(mockNotificationApi.open).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'クイズの編集が完了しました',
        }),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/quiz/list');
    });
  });

  test('バリデーションエラーがでる', async () => {
    const user = userEvent.setup();
    render(<EditFormWithNotification />);

    const question = screen.getByDisplayValue(defaultQuiz.question);
    await userEvent.clear(question);

    const option1 = screen.getByDisplayValue(defaultQuiz.option1);
    await userEvent.clear(option1);

    const option2 = screen.getByDisplayValue(defaultQuiz.option2);
    await userEvent.clear(option2);

    const option3 = screen.getByDisplayValue(defaultQuiz.option3);
    await userEvent.clear(option3);

    const option4 = screen.getByDisplayValue(defaultQuiz.option4);
    await userEvent.clear(option4);

    const correctCheckbox =
      screen.getAllByRole('checkbox')[defaultQuiz.correctOption - 1];
    await user.click(correctCheckbox);
    await user.click(correctCheckbox);

    const submitButton = screen.getByRole('button', { name: /編集完了/i });
    await user.click(submitButton);

    expect(screen.getByText('問題文を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢1を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢2を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢3を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢4を入力してください')).toBeInTheDocument();
  });
});
