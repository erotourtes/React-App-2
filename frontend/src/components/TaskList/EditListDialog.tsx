import MyDialog from "@/components/MyDialog";
import { H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputChange } from "@/utils/utils";
import { TaskListT } from "@packages/types";
import { useState } from "react";

interface EditListDialogProps {
  list: TaskListT;
  open: boolean;
  onDialogChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

const EditListDialog = ({
  list,
  open,
  onDialogChange,
  onSubmit,
}: EditListDialogProps) => {
  const [name, setName] = useState(list.name);

  return (
    <MyDialog isOpen={open} onDialogChange={onDialogChange}>
      <div className="space-y-5 p-5">
        <H3>Edit list</H3>
        <div>
          Change name
          <Input
            value={name}
            onChange={inputChange(setName)}
            placeholder="List name"
          />
        </div>
        <Button
          onClick={() => {
            onDialogChange(false);
            onSubmit(name);
          }}
        >
          Submit
        </Button>
      </div>
    </MyDialog>
  );
};

export default EditListDialog;
