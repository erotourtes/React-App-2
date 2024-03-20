import { Dialog, DialogClose, DialogContent } from "@components/ui/dialog";

import { X } from "lucide-react";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
};

const MyDialog = ({
  onDialogChange,
  isOpen,
  children,
  className = "",
}: TaskDialogProps) => {
  return (
    <Dialog onOpenChange={onDialogChange} open={isOpen}>
      <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
        <div className="w-full h-full overflow-hidden">
          <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
            <DialogClose
              asChild
              className="cursor-pointer hover:text-destructive"
            >
              <X />
            </DialogClose>
          </div>
          <div className={`max-h-[calc(90vh-50px)] h-full w-full ${className}`}>
            <div className="h-full overflow-auto">{children}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
