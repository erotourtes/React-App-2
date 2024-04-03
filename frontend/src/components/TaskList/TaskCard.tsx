import MoveToListSelect from "@/components/TaskList/MoveToListSelect";
import { strDateFormat } from "@/utils/utils";
import { TaskListT, TaskT } from "@packages/types";
import {
  Calendar,
  EllipsisVertical,
  FileBarChart,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/api/hooks";
import { PopupIcon } from "../popmenu-utils";
import Priority from "../Priority";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditTaskDialog } from "./TaskEditDialog";

function TaskCard({
  task,
  list: selectedList,
  disabled,
}: {
  task: TaskT;
  list: TaskListT;
  disabled?: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const onEditPressed = (e: Event) => {
    e.stopPropagation();
    setOpenDialog(true);
    setOpenMenu(false);
    setEditMode(true);
  };

  const onDeletePressed = (e: Event) => {
    e.stopPropagation();
    e.stopPropagation();
    deleteTask(task);
  };

  const onCardPressed = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.stopPropagation();
    setEditMode(false);
    setOpenDialog(true);
  };

  return (
    <Card className={`hover:border-primary ${disabled && "bg-muted"}`}>
      <CardHeader
        onClick={onCardPressed}
        className="p-3 pb-1 flex-row justify-between items-center"
      >
        <p className="text-ellipsis overflow-hidden w-[200px]">{task.name}</p>
        <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
          <DropdownMenuTrigger
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground rounded-sm"
          >
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onEditPressed}>
              <PopupIcon icon={<Pencil />} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={onDeletePressed}
              className="des-btn focus:des-btn-rev"
            >
              <PopupIcon icon={<Trash2 />} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        onClick={onCardPressed}
        className="p-3 pt-0 flex flex-col gap-y-3"
      >
        <p className="text-[0.9rem] opacity-grayish text-ellipsis overflow-hidden w-[200px] line-clamp-1 ">
          {task.description}
        </p>
        <div className="flex gap-3">
          <FileBarChart />
          <span className="opacity-grayish">{selectedList.name}</span>
        </div>
        <div className="flex gap-3">
          <Calendar />
          <span className="opacity-grayish">
            {strDateFormat(task.dueDate) || "Not set"}
          </span>
        </div>
        <div>
          <Priority priority={task.priority} />
        </div>
        <MoveToListSelect
          className="bg-secondary"
          selectedListId={selectedList.id}
          boardId={selectedList.boardId}
          onSelect={(id) =>
            updateTask({ oldTask: task, updatedTask: { ...task, listId: id } })
          }
          disabled={disabled}
        />
      </CardContent>
      {openDialog && (
        <EditTaskDialog
          isOpen={openDialog}
          onDialogChange={(open) => setOpenDialog(open)}
          task={task}
          selectedList={selectedList}
          editMode={editMode}
        />
      )}
    </Card>
  );
}

export default TaskCard;
