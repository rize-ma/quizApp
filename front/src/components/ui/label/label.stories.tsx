import type { Meta, StoryObj } from '@storybook/react/*';
import { Label } from './label';
import { action } from '@storybook/addon-actions';
import { Input } from '../input/input';

const meta: Meta<typeof Label> = {
  title: 'components/ui/label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ラベル',
    onClick: action('default click'),
    className: '',
  },
};

/**
 * 入力欄と紐づけての使用を想定
 * */
export const PasswordInput: Story = {
  args: {
    children: 'メールアドレス',
    onClick: action('default click'),
    className: '',
  },
  render: () => (
    <>
      <Label>パスワード</Label>
      <Input type="password" placeholder="パスワードを入力" />
    </>
  ),
};
