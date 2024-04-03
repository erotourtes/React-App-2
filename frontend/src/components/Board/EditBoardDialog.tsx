import MyDialog from "@/components/MyDialog";
import { H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputChange } from "@/utils/utils";
import { BoardT } from "@packages/types";
import { useState } from "react";

interface EditBoardDialogProps {
  board: BoardT;
  open: boolean;
  onDialogChange: (open: boolean) => void;
  onSubmit: (board: BoardT) => void;
}

const EditBoardDialog = ({ board, open, onDialogChange, onSubmit, }: EditBoardDialogProps) => {
  const [name, setName] = useState(board.name);

  return (
    <MyDialog isOpen={open} onDialogChange={onDialogChange}>
      <div className="space-y-5 p-5">
        <H3>Edit Board</H3>
        <div>
          Change name
          <Input
            value={name}
            onChange={inputChange(setName)}
            placeholder="Board name"
          />
        </div>
        <Button
          onClick={() => {
            onDialogChange(false);
            onSubmit({ id: board.id, name });
          }}
        >
          Submit
        </Button>
      </div>
    </MyDialog>
  );
};

export default EditBoardDialog;
