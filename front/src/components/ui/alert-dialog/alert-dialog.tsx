import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from 'src/lib/utils';
import { buttonVariants } from '@/components/ui/alert-dialog/button';
import { Button } from '../button/button';
import { LogOut } from 'lucide-react';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

interface AlertDialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  className?: string;
}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-40 bg-white/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  className?: string;
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] rounded-lg z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  className?: string;
}

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Description
  > {
  className?: string;
}

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  className?: string;
}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  className?: string;
}

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

interface LogoutAlertDialogProps {
  onClickLogout: () => void;
}
const LogoutAlertDialog = ({ onClickLogout }: LogoutAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex justify-start p-0 w-full rounded-xl">
        <Button
          variant="ghost"
          className="flex justify-start text-sm rounded-xl px-2 py-0 w-full h-8 hover:text-black hover:bg-white"
        >
          <LogOut size="17" />
          <span className="text-sm">ログアウト</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black-opacity-80 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>本当にログアウトしますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel className="sm:mr-5 mt-5 hover:bg-white hover:text-black">
            戻る
          </AlertDialogCancel>
          <AlertDialogAction
            className="mt-5 bg-sky-400 hover:bg-sky-400/75"
            onClick={onClickLogout}
          >
            ログアウト
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface DeleteConfirmDialogProps {
  isQuizSelected: boolean;
  onClickDelete: () => void;
  children: React.ReactNode;
}
const DeleteConfirmDialog = ({
  isQuizSelected,
  onClickDelete,
  children,
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={!isQuizSelected}
        className="flex justify-start p-0 w-full rounded-xl cursor-pointer"
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black-opacity-80 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel className="sm:mr-5 mt-5 hover:bg-white hover:text-black">
            戻る
          </AlertDialogCancel>
          <AlertDialogAction
            className="mt-5 bg-sky-400 hover:bg-sky-400/75"
            onClick={onClickDelete}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface CancelEditConfirmDialogProps {
  onClickCancel: () => void;
  children: React.ReactNode;
}

const CancelEditConfirmDialog = ({
  onClickCancel,
  children,
}: CancelEditConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex justify-start p-0 w-full rounded-xl cursor-pointer">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black-opacity-80 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>本当に編集を中断しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          行った変更は反映されません
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel className="sm:mr-5 mt-5 hover:bg-white hover:text-black">
            戻る
          </AlertDialogCancel>
          <AlertDialogAction
            className="mt-5 bg-sky-400 hover:bg-sky-400/75"
            onClick={onClickCancel}
          >
            中断
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  LogoutAlertDialog,
  DeleteConfirmDialog,
  CancelEditConfirmDialog,
};
