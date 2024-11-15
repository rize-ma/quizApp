import type { Meta, StoryObj } from '@storybook/react/*';
import { Checkbox } from './checkbox';
import { Label } from '../label/label';
import { Textarea } from '../textarea/textarea';

const meta: Meta<typeof Checkbox> = {
  title: 'components/ui/checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
};

/**
 * クイズ投稿ページなどで入力欄に付与したりする予定
 * */
export const LoginCard: Story = {
  render: () => (
    <>
      <div className="flex items-center space-x-2 mb-1">
        <Label>選択肢1</Label>
        <div className="ml-10">
          <Label>正解</Label>
          <Checkbox className="ml-1 rounded flex items-center" />
        </div>
      </div>
      <Textarea className="rounded-xl" placeholder="選択肢1を入力" />
    </>
  ),
};
