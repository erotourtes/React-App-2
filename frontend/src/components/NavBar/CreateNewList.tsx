import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateNewListMutation } from "@/redux/api/hooks";
import { inputChange } from "@/utils/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

const CreateNewList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createNewList] = useCreateNewListMutation();

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Plus />
        Create new list
      </Button>
      <CreateNewListDialog
        isOpen={isOpen}
        onDialogChange={setIsOpen}
        onDialogSubmit={(name) => {
          createNewList({ name, tasksIds: [] });
          setIsOpen(false);
        }}
      />
    </div>
  );
};

interface CreateNewListDialogProps {
  isOpen: boolean;
  onDialogChange: (open: boolean) => void;
  onDialogSubmit: (name: string) => void;
}

const CreateNewListDialog = ({
  isOpen,
  onDialogChange,
  onDialogSubmit,
}: CreateNewListDialogProps) => {
  const [name, setName] = useState("Todo");

  return (
    <Dialog open={isOpen} onOpenChange={onDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new list</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-center">
            Name
          </Label>
          <Input
            onChange={inputChange(setName)}
            id="name"
            defaultValue="Todo"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onDialogSubmit(name)} type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewList;
