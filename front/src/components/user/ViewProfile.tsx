import { FC } from 'react';
import { User } from '../../type/user';
import { Image } from 'antd';
import { Label } from '../ui/label/label';
import initialIcon from '../../assets/user-icon.png';

interface ViewProfileProps {
  user?: User;
}

export const ViewProfile: FC<ViewProfileProps> = ({ user }) => {
  return (
    <div className="sm:flex">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full overflow-hidden">
          <Image
            className="rounded-full w-full h-full object-cover"
            width={160}
            height={160}
            src={user?.iconUrl ?? initialIcon}
          />
        </div>
        <div className="mt-2 text-lg">
          <span>{user?.userId}</span>
        </div>
      </div>
      <div className="sm:ml-24 sm:min-w-52 mt-5 w-full">
        <div>
          <Label>ユーザー名</Label>
          <div className="mt-2">
            <span className="text-xl">{user?.username}</span>
          </div>
        </div>
        <div className="mt-10">
          <Label>自己紹介</Label>
          <div className="mt-2">
            <span className="text-xl">{user?.selfIntroduction}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
