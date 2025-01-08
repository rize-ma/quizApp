import { FC, useState } from 'react';

import { User } from '../../type/user';
import { Pencil, PencilOff } from 'lucide-react';
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

interface ProfileProps {
  user?: User;
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEdit = () => {
    setIsEdit(true);
  };
  const onClickCancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
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
            <EditProfile user={user} setIsEdit={setIsEdit} />
          ) : (
            <ViewProfile user={user} />
          )}
        </div>
      </div>
    </>
  );
};
