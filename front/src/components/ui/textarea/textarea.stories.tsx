import type { Meta, StoryObj } from '@storybook/react/*';
import { Textarea } from './textarea';
import { Label } from '@radix-ui/react-label';

const meta: Meta<typeof Textarea> = {
  title: 'components/ui/textarea',
  component: Textarea,
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
    placeholder: 'デフォルト',
    className: '',
  },
};

/**
 * クイズを投稿、編集フォームでの問題文入力用
 * */
export const QuestionTextarea: Story = {
  render: () => (
    <div>
      <Label>問題文</Label>
      <Textarea className="rounded-xl" placeholder="問題文を入力" />
    </div>
  ),
};
