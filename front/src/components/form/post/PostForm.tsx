import { Alert, AlertTitle } from '@/components/ui/alert/alert';
import { Options, PostInput } from '../../../type/quiz';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { AlertCircle, Check, CircleX } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { FC, useState } from 'react';
import { quizPost } from '../../../api/quiz';
import { notification } from 'antd';

export const PostForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<PostInput>();
  const userId = localStorage.getItem('userId');
  if (userId) {
    setValue('createdBy', userId);
  }
  const [checkedOption, setCheckedOption] = useState<Options>();
  const onChangeCheckbox = (option: Options) => {
    if (checkedOption === option) {
      reset({ correctOption: undefined });
      setCheckedOption(undefined);
      return;
    }
    setValue('correctOption', option);
    setCheckedOption(option);
  };
  const [api, contextHolder] = notification.useNotification();
  const onSubmit = async (input: PostInput) => {
    try {
      await quizPost(input);
      reset();
      api.open({
        message: 'クイズが投稿されました',
        icon: <Check size={28} color="#00ff33" />,
        placement: 'top',
      });
    } catch {
      api.open({
        message: <p className="text-red-600">クイズの投稿に失敗しました</p>,
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
  return (
    <div className="w-full m-5 p-1 lg:m-10 lg:p-5 md:m-5 md:p-2">
      {contextHolder}
      <h1 className="text-2xl">クイズを投稿</h1>
      <div className="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="hidden"
            {...register('correctOption', {
              required: '正解の選択肢を指定してください',
            })}
          />
          <div>
            <div>
              <Alert
                className={clsx('mb-8', {
                  hidden: !errors.correctOption?.message,
                })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.correctOption?.message}</AlertTitle>
              </Alert>
            </div>
            <Label>問題文</Label>
            <Alert
              className={clsx('mb-1', { hidden: !errors.question?.message })}
              variant="error"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{errors.question?.message}</AlertTitle>
            </Alert>
            <Textarea
              className="rounded-xl mt-1 w-full min-h-32 text-lg"
              placeholder="問題文を入力してください"
              {...register('question', {
                required: '問題文を入力してください',
              })}
            />
          </div>
          <div className="mt-8">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Label>選択肢1</Label>
                <div className="ml-10 flex items-center">
                  <Label>正解</Label>
                  <div>
                    <Checkbox
                      className="ml-1 rounded flex items-center"
                      checked={checkedOption === 1}
                      onCheckedChange={() => {
                        onChangeCheckbox(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Alert
                className={clsx('mb-1', { hidden: !errors.option1?.message })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.option1?.message}</AlertTitle>
              </Alert>
              <Textarea
                className="rounded-xl mt-1"
                placeholder="選択肢1を入力"
                {...register('option1', {
                  required: '選択肢1を入力してください',
                })}
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center space-x-2 mb-1">
                <Label>選択肢2</Label>
                <div className="ml-10 flex items-center">
                  <Label>正解</Label>
                  <div>
                    <Checkbox
                      className="ml-1 rounded flex items-center"
                      checked={checkedOption === 2}
                      onCheckedChange={() => {
                        onChangeCheckbox(2);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Alert
                className={clsx('mb-1', { hidden: !errors.option2?.message })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.option2?.message}</AlertTitle>
              </Alert>
              <Textarea
                className="rounded-xl mt-1"
                placeholder="選択肢2を入力"
                {...register('option2', {
                  required: '選択肢2を入力してください',
                })}
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center space-x-2 mb-1">
                <Label>選択肢3</Label>
                <div className="ml-10 flex items-center">
                  <Label>正解</Label>
                  <div>
                    <Checkbox
                      className="ml-1 rounded flex items-center"
                      checked={checkedOption === 3}
                      onCheckedChange={() => {
                        onChangeCheckbox(3);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Alert
                className={clsx('mb-1', { hidden: !errors.option3?.message })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.option3?.message}</AlertTitle>
              </Alert>
              <Textarea
                className="rounded-xl mt-1"
                placeholder="選択肢3を入力"
                {...register('option3', {
                  required: '選択肢3を入力してください',
                })}
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center space-x-2 mb-1">
                <Label>選択肢4</Label>
                <div className="ml-10 flex items-center">
                  <Label>正解</Label>
                  <div>
                    <Checkbox
                      className="ml-1 rounded flex items-center"
                      checked={checkedOption === 4}
                      onCheckedChange={() => {
                        onChangeCheckbox(4);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Alert
                className={clsx('mb-1', { hidden: !errors.option4?.message })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.option4?.message}</AlertTitle>
              </Alert>
              <Textarea
                className="rounded-xl mt-1"
                placeholder="選択肢4を入力"
                {...register('option4', {
                  required: '選択肢4を入力してください',
                })}
              />
            </div>
          </div>
          <div className="mt-10 flex md:justify-end">
            <Button className="w-full md:w-48" type="submit">
              投稿する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
