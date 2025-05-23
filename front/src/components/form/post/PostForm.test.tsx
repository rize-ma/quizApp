import { USER_ID, POST_QUIZ } from '../../../test/constants';
import { PostForm } from './PostForm';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TestLayout } from '../../../test/TestLayout';

describe('クイズ投稿フォーム', () => {
  beforeEach(() => {
    localStorage.setItem('userId', USER_ID);
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('投稿フォームが表示されている', async () => {
    render(
      <TestLayout>
        <PostForm />
      </TestLayout>,
    );

    expect(screen.getByText('問題文')).toBeInTheDocument();
    expect(screen.getByText('選択肢1')).toBeInTheDocument();
    expect(screen.getByText('選択肢2')).toBeInTheDocument();
    expect(screen.getByText('選択肢3')).toBeInTheDocument();
    expect(screen.getByText('選択肢4')).toBeInTheDocument();
    expect(screen.getByText('投稿する')).toBeInTheDocument();
  });

  test('正常にクイズを投稿できる', async () => {
    const user = userEvent.setup();
    render(
      <TestLayout>
        <PostForm />
      </TestLayout>,
    );
    const { CORRECT_OPTION, OPTION1, OPTION2, OPTION3, OPTION4, QUESTION } =
      POST_QUIZ;

    const question = screen.getByPlaceholderText('問題文を入力してください');
    await user.type(question, QUESTION);

    const option1 = screen.getByPlaceholderText('選択肢1を入力');
    await user.type(option1, OPTION1);

    const option2 = screen.getByPlaceholderText('選択肢2を入力');
    await user.type(option2, OPTION2);

    const option3 = screen.getByPlaceholderText('選択肢3を入力');
    await user.type(option3, OPTION3);

    const option4 = screen.getByPlaceholderText('選択肢4を入力');
    await user.type(option4, OPTION4);

    const correctCheckbox = screen.getAllByRole('checkbox')[CORRECT_OPTION - 1];
    await user.click(correctCheckbox);

    const submitButton = screen.getByRole('button', { name: /投稿する/i });
    await user.click(submitButton);

    const successMessage = await screen.findByText('クイズが投稿されました');

    expect(successMessage).toBeInTheDocument();
  });

  test('バリデーションエラーがでる', async () => {
    const user = userEvent.setup();
    render(
      <TestLayout>
        <PostForm />
      </TestLayout>,
    );

    const submitButton = screen.getByRole('button', { name: /投稿する/i });
    await user.click(submitButton);

    expect(
      screen.getByText('正解の選択肢を指定してください'),
    ).toBeInTheDocument();
    expect(screen.getByText('問題文を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢1を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢2を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢3を入力してください')).toBeInTheDocument();
    expect(screen.getByText('選択肢4を入力してください')).toBeInTheDocument();
  });
});
