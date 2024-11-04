import type { Meta, StoryObj } from '@storybook/react/*';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Input } from '../input/input';
import { Button } from '../button/button';

const meta: Meta<typeof Card> = {
  title: 'components/ui/card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          本文,入力欄など
          <Input className="mt-5" placeholder="入力欄" />
          <Button className="mt-5">デフォルト</Button>
        </CardContent>
        <CardFooter>フッター</CardFooter>
      </>
    ),
  },
};

/**
 * ログインカード
 * */
export const LoginCard: Story = {
  args: {
    children: (
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ログイン</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Input
            className="mt-12"
            type="email"
            placeholder="メールアドレスを入力"
          />
          <Input
            className="mt-10"
            type="password"
            placeholder="パスワードを入力"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-5" type="submit">
            ログイン
          </Button>
        </CardFooter>
      </div>
    ),
  },
};

/**
 * 登録カード1
 * */
export const RegisterCard1: Story = {
  args: {
    children: (
      <div className="flex flex-col justify-center w-96 p-5">
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ユーザー登録</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Input
            className="mt-12"
            type="email"
            placeholder="メールアドレスを入力"
          />
          <Input
            className="mt-10"
            type="password"
            placeholder="パスワードを入力"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            <ChevronsRight size="23" color="#ffffff" strokeWidth={2} />
            次へ
          </Button>
        </CardFooter>
      </div>
    ),
  },
};

/**
 * 登録カード2
 * */
export const RegisterCard2: Story = {
  args: {
    children: (
      <div className='className="flex flex-col justify-center w-96 p-5"'>
        <CardHeader>
          <CardTitle className="my-0 mx-auto">ユーザー登録</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Input className="mt-12" placeholder="ユーザーIDを入力" />
          <Input className="mt-10" placeholder="ユーザー名を入力" />
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-10">
          <Button>
            <ChevronsLeft size="23" color="#ffffff" strokeWidth={2} />
            戻る
          </Button>
          <Button className="w-5/12" type="submit">
            登録
          </Button>
        </CardFooter>
      </div>
    ),
  },
};
