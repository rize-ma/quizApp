import type { Meta, StoryObj } from '@storybook/react/*';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Pencil } from 'lucide-react';

const meta: Meta<typeof TooltipProvider> = {
  title: 'components/ui/tooltip',
  component: TooltipProvider,
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
      <Tooltip>
        <TooltipTrigger>ツールチップ</TooltipTrigger>
        <TooltipContent>
          <p>デフォルト</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
};

/**
 * 各アイコンなどに適応させるツールチップ
 * */
export const QuestionTextarea: Story = {
  args: {
    children: (
      <Tooltip>
        <TooltipTrigger>
          <Pencil />
        </TooltipTrigger>
        <TooltipContent>
          <p>編集する</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
};
