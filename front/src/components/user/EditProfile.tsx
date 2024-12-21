import { Dispatch, FC, SetStateAction, useState } from 'react';
import { User, EditUserInput } from '../../type/user';
import { Image, Spin } from 'antd';
import { Label } from '../ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useForm } from 'react-hook-form';
import { editUser } from '../../api/user';
import { NotificationInstance } from 'antd/es/notification/interface';
import { AlertCircle, Check, CircleX } from 'lucide-react';
import { Alert, AlertTitle } from '../ui/alert/alert';
import { clsx } from 'clsx';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { signIn, storage } from '../../firebase';
import { useDropzone } from 'react-dropzone';

interface EditProfileProps {
  user: User;
  notification: NotificationInstance;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const EditProfile: FC<EditProfileProps> = ({
  user,
  notification,
  setIsEdit,
}) => {
  const { id, iconUrl, selfIntroduction, username } = user;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<EditUserInput>({
    defaultValues: {
      id,
      iconUrl,
      selfIntroduction,
      username,
    },
  });

  const [loading, setLoading] = useState(false);
  const imageUrl = getValues('iconUrl');

  const onDrop = async (files: File[]) => {
    setLoading(true);
    if (!files.length) return;
    if (files.length !== 1) {
      notification.open({
        message: (
          <p className="text-red-600">ファイルのアップロードに失敗しました</p>
        ),
        description: (
          <p className="text-red-600">
            複数のファイルをアップロードすることはできません
          </p>
        ),
        icon: <CircleX size={28} color="#ff0000" />,
        placement: 'top',
      });
      return;
    }
    const file = files[0];
    const storageRef = ref(storage, `image/${file.name}`);

    try {
      await signIn();
      await uploadBytes(storageRef, file);
      try {
        const url = await getDownloadURL(storageRef);
        setValue('iconUrl', url);
      } catch {
        notification.open({
          message: (
            <p className="text-red-600">
              アップロードしたファイルの取得にに失敗しました
            </p>
          ),
          description: (
            <p className="text-red-600">
              時間を開けるか再度ログインし直してお試しください
            </p>
          ),
          icon: <CircleX size={28} color="#ff0000" />,
          placement: 'top',
        });
      }
    } catch {
      notification.open({
        message: (
          <p className="text-red-600">ファイルのアップロードに失敗しました</p>
        ),
        description: (
          <p className="text-red-600">
            時間を開けるか再度ログインし直してお試しください
          </p>
        ),
        icon: <CircleX size={28} color="#ff0000" />,
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  const onSubmit = async (input: EditUserInput) => {
    try {
      await editUser({
        id: user.id,
        iconUrl: input.iconUrl,
        selfIntroduction: input.selfIntroduction,
        username: input.username,
      });
      reset();
      notification.open({
        message: 'プロフィールの編集が完了しました',
        icon: <Check size={28} color="#00ff33" />,
        placement: 'top',
      });
      setIsEdit(false);
    } catch {
      notification.open({
        message: <p className="text-red-600">クイズの編集が失敗しました</p>,
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full sm:flex max-sm:mt-10">
          <div className="flex flex-col justify-center items-center">
            <div
              className={imageUrl && 'rounded-full w-40 h-40 overflow-hidden'}
            >
              <Spin
                className="w-fit h-fit"
                tip="アップロード中..."
                spinning={loading}
              >
                <div
                  {...getRootProps()}
                  className={clsx(
                    'border-2 border-dotted',
                    imageUrl
                      ? 'rounded-full w-40 h-40 overflow-hidden'
                      : 'rounded-lg min-h-32 flex justify-center items-center flex-col',
                    {
                      'border-blue-600': isDragActive && !imageUrl,
                      'border-gray-300': !isDragActive && !imageUrl,
                    },
                  )}
                >
                  {imageUrl && (
                    <Image
                      alt="プレビュー画像"
                      className="w-full h-full object-cover"
                      height={160}
                      preview={false}
                      src={imageUrl!}
                      width={160}
                    />
                  )}
                  <input {...getInputProps()} />
                  {!imageUrl && (
                    <p className="text-gray-400 flex justify-center items-center h-full text-center m-5">
                      ここにアップロードしたい画像をドラッグ&ドロップしてください。
                    </p>
                  )}
                </div>
              </Spin>
            </div>
            <div className="mt-2 text-lg">
              <span>{user?.userId}</span>
            </div>
          </div>
          <div className="sm:ml-24 sm:min-w-52 mt-5 w-full">
            <div>
              <Label>ユーザー名</Label>
              <div className="mt-2">
                <Input
                  className="rounded-xl mt-1"
                  placeholder="ユーザー名を入力"
                  {...register('username', {
                    required: 'ユーザー名を入力してください',
                  })}
                />
              </div>
              <Alert
                className={clsx('mb-1', { hidden: !errors.username?.message })}
                variant="error"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{errors.username?.message}</AlertTitle>
              </Alert>
            </div>
            <div className="mt-5">
              <Label>自己紹介</Label>
              <div className="mt-2">
                <Textarea
                  className="rounded-xl mt-1"
                  placeholder="自己紹介を入力"
                  {...register('selfIntroduction')}
                />
              </div>
            </div>
            <div className="mt-10 sm:flex sm:justify-end">
              <Button className="w-full sm:w-24" type="submit">
                保存
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
