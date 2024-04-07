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
import { useLocation, useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: TaskT;
  list: TaskListT;
  disabled?: boolean;
}

function TaskCard({ task, list: selectedList, disabled }: TaskCardProps) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const taskId = Number(queryParams.get("task") || "");
  const edit = Boolean(queryParams.get("edit") === "");

  return (
    <TaskCardOrig
      task={task}
      list={selectedList}
      disabled={disabled}
      open={taskId === task.id}
      edit={taskId === task.id && edit}
      onCardClick={() => navigate(`?task=${task.id}`)}
      onEditClick={() => navigate(`?task=${task.id}&edit`)}
      onDialogClose={() => navigate(".")}
    />
  );
}

interface TaskCardPropsOrig {
  task: TaskT;
  list: TaskListT;
  disabled?: boolean;
  edit?: boolean;
  open?: boolean;
  onCardClick: () => void;
  onEditClick: () => void;
  onDialogClose: () => void;
}

function TaskCardOrig({
                        task,
                        list: selectedList,
                        disabled,
                        edit = false,
                        open,
                        onCardClick,
                        onEditClick,
                        onDialogClose
                      }: TaskCardPropsOrig) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(open);
  const [editMode, setEditMode] = useState(edit);

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const onEditPressed = (e: Event) => {
    e.stopPropagation();
    onEditClick();
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
    onCardClick()
    setEditMode(false);
    setOpenDialog(true);
  };

  const onDialogChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) onDialogClose();
  }

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
            <EllipsisVertical/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onEditPressed} onClick={(e) => e.stopPropagation()}>
              <PopupIcon icon={<Pencil/>}/>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
              onSelect={onDeletePressed}
              className="des-btn focus:des-btn-rev"
            >
              <PopupIcon icon={<Trash2/>}/>
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
          <FileBarChart/>
          <span className="opacity-grayish">{selectedList.name}</span>
        </div>
        <div className="flex gap-3">
          <Calendar/>
          <span className="opacity-grayish">
            {strDateFormat(task.dueDate) || "Not set"}
          </span>
        </div>
        <div>
          <Priority priority={task.priority}/>
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
          onDialogChange={onDialogChange}
          onEditRequest={() => onEditClick()}
          task={task}
          selectedList={selectedList}
          editMode={editMode}
        />
      )}
    </Card>
  );
}

export default TaskCard;
