import { FC, useContext, useEffect, useState } from 'react';

import { User } from '../../type/user';
import { CircleX, Pencil, PencilOff } from 'lucide-react';
import { Button } from '../ui/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip/tooltip';
import { ViewProfile } from './ViewProfile';
import { EditProfile } from './EditProfile';
import { CancelEditConfirmDialog } from '../ui/alert-dialog/alert-dialog';
import { getUserById } from '../../api/user';
import { NotificationContext } from '../layout/Layout';
import { Spin } from 'antd';

export const Profile: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState(false);
  const notification = useContext(NotificationContext);
  const loadUser = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error();
      }
      const res = await getUserById(userId);
      setUser(res);
      setLoading(false);
    } catch {
      setLoading(false);
      notification?.open({
        message: (
          <p className="text-red-600">ユーザー情報が取得できませんでした</p>
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
  };
  const onClickEdit = () => {
    setIsEdit(true);
  };
  const onClickCancelEdit = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <Spin tip="Loading..." size="large" spinning={isLoading}>
        <div className="bg-zinc-900 rounded-md mt-28 h-fit p-5 mr-5 min-w-64 flex max-sm:flex-col sm:flex relative">
          <div className="absolute top-0 right-0 text-white p-2">
            {isEdit ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CancelEditConfirmDialog onClickCancel={onClickCancelEdit}>
                      <Button variant="ghost">
                        <PencilOff size={20} />
                      </Button>
                    </CancelEditConfirmDialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>編集を中止</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      disabled={!user}
                      onClick={onClickEdit}
                      variant="ghost"
                    >
                      <Pencil size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>プロフィール編集</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="w-full">
            {isEdit && user ? (
              <EditProfile
                user={user}
                setIsEdit={setIsEdit}
                loadUser={loadUser}
              />
            ) : (
              <ViewProfile user={user} />
            )}
          </div>
        </div>
      </Spin>
    </>
  );
};
