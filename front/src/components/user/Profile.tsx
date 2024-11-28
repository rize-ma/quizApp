import { Image } from 'antd';
import { FC } from 'react';
import { Label } from '../ui/label/label';

export const Profile: FC = () => {
  return (
    <div className="bg-zinc-900 rounded-md mt-28 h-fit p-5 mr-5 min-w-64 flex max-sm:flex-col sm:flex ">
      <div className=" flex flex-col justify-center items-center">
        <Image
          className="rounded-full"
          width={150}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="mt-2">
          <span>userID</span>
        </div>
      </div>
      <div className="sm:ml-12 max-sm:mt-5 w-full">
        <div>
          <Label>ユーザー名</Label>
          <div className="pl-5 mt-2">
            <span className="text-xl">testユーザー</span>
          </div>
        </div>
        <div className="mt-10">
          <Label>自己紹介</Label>
          <div className="pl-5 mt-2">
            <span className="text-xl">
              テストテストテストテストテストテスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト テスト テスト テスト テスト テスト
              テスト テスト テスト テスト
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
