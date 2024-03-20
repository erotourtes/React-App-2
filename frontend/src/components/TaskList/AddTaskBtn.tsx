import { AddTaskDialog } from "@/components/TaskList/TaskEditDialog";
import { Button } from "@/components/ui/button";
import { TaskListT } from "@packages/types";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddTaskBtn = ({ list }: { list: TaskListT }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="w-full gap-2 border-dashed border-2"
      >
        <Plus />
        Add new card
      </Button>
      {open && (
        <AddTaskDialog
          isOpen={open}
          onDialogChange={setOpen}
          selectedListId={list.id}
        />
      )}
    </>
  );
};

export default AddTaskBtn;
