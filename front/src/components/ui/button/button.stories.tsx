import type { Meta, StoryObj } from '@storybook/react/*';
import { Button } from './button';
import { action } from '@storybook/addon-actions';
import { ChevronsRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'components/ui/button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'デフォルト',
    disabled: false,
    onClick: action('default click'),
    className: '',
    variant: 'default',
  },
};

/**
 * 次へ進むボタン
 * */
export const NextButton: Story = {
  args: {
    children: (
      <>
        <ChevronsRight size="23" color="#ffffff" strokeWidth={2} />
        次へ
      </>
    ),
    onClick: action('default click'),
    className: '',
    variant: 'default',
  },
};

/**
 * 登録ボタン
 * */
export const RegisterButton: Story = {
  args: {
    children: '登録',
    onClick: action('default click'),
    className: '',
  },
};

/**
 * ログインボタン
 * */
export const LoginButton: Story = {
  args: {
    children: 'ログイン',
    onClick: action('default click'),
    className: '',
  },
};
