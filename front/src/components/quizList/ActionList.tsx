import { Info, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip/tooltip';
import { FC } from 'react';
import { Button } from '../ui/button/button';

interface ActionListProps {
  onClickEdit: () => void;
}

export const ActionList: FC<ActionListProps> = ({ onClickEdit }) => {
  return (
    <div className="rounded-md bg-zinc-900 text-white w-full flex items-center px-5 h-12 max-sm:justify-around">
      <div className="mr-10 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size="20" />
            </TooltipTrigger>
            <TooltipContent>
              <p>クイズ詳細</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mr-10 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" onClick={onClickEdit}>
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
              <Trash2 size="20" />
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
