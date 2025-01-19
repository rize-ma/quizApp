import { Info, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip/tooltip';
import { FC } from 'react';
import { Button } from '../ui/button/button';
import { DataSource } from '../../utils/tableData';
import { DeleteConfirmDialog } from '../ui/alert-dialog/alert-dialog';
import { clsx } from 'clsx';

interface ActionListProps {
  selectedQuizzes: DataSource[];
  onClickEdit: () => void;
  onClickDelete: () => void;
  isSticky: boolean;
}

export const ActionList: FC<ActionListProps> = ({
  selectedQuizzes,
  onClickEdit,
  onClickDelete,
  isSticky,
}) => {
  console.log(isSticky);
  const isQuizSelected = Boolean(selectedQuizzes.length);
  return (
    <div
      className={clsx(
        'rounded-md w-full flex items-center px-5 h-12 max-sm:justify-around',
        {
          'bg-zinc-900': !isSticky,
          'text-white': !isSticky,
          'bg-zinc-400': isSticky,
          'text-black': isSticky,
        },
      )}
    >
      <div className="mr-10 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button disabled={!isQuizSelected} variant="ghost">
                <Info size="20" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>クイズ詳細(未実装)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mr-10 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={!isQuizSelected}
                variant="ghost"
                onClick={onClickEdit}
              >
                <Pencil size="20" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>クイズ編集</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DeleteConfirmDialog
                isQuizSelected={isQuizSelected}
                onClickDelete={onClickDelete}
              >
                <Button disabled={!isQuizSelected} variant="ghost">
                  <Trash2 size="20" />
                </Button>
              </DeleteConfirmDialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>クイズ削除</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
