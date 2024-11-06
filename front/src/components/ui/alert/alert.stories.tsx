import type { Meta, StoryObj } from '@storybook/react/*';
import { Alert, AlertTitle } from './alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../input/input';
const meta: Meta<typeof Alert> = {
  title: 'components/ui/alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'アラート',
    className: '',
    variant: 'default',
  },
};

/**
 * エラーアラート
 * バリデーションエラーなどでの使用を想定
 * */
export const ErroAlert: Story = {
  render: () => (
    <>
      <Label>パスワード</Label>
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>パスワードを入力してください</AlertTitle>
      </Alert>
      <Input type="password" placeholder="パスワードを入力" />
    </>
  ),
};
