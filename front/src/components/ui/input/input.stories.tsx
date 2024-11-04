import type { Meta, StoryObj } from '@storybook/react/*';
import { Input } from './input';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Input> = {
  title: 'components/ui/input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};

/**
 * ユーザー登録、ログイン画面のメールアドレス入力用
 * */
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'メールアドレスを入力',
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};

/**
 * ユーザー登録、ログイン画面のパスワード入力用
 * */
export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'パスワードを入力',
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};

/**
 * ユーザー登録画面のパスワード入力用
 * */
export const UserIdInput: Story = {
  args: {
    type: '',
    placeholder: 'ユーザーIDを入力',
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};

/**
 * ユーザー登録画面のパスワード入力用
 * */
export const UserNameInput: Story = {
  args: {
    type: '',
    placeholder: 'ユーザー名を入力',
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};
