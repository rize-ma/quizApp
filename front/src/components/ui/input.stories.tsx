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
 * ログイン画面のメールアドレス入力用
 * */
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
    disabled: false,
    onClick: action('default click'),
    className: '',
  },
};
