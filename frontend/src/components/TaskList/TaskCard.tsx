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

  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(taskId === task.id);
  const [editMode, setEditMode] = useState(taskId === task.id && edit);

  const onCardClick = () => {
    setEditMode(false);
    setOpenDialog(true);
    navigate(`?task=${task.id}`)
  }

  const onEdit3DotsClick = () => {
    setOpenDialog(true);
    setOpenMenu(false);
    setEditMode(true);
    navigate(`?task=${task.id}&edit`)
  }

  const onEditRequest = () => navigate(`?task=${task.id}&edit`)


  const onDialogChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) navigate(".")
  }

  return (
    <TaskCardOrig
      task={task}
      list={selectedList}
      disabled={disabled}
      openDialog={openDialog}
      edit={editMode}
      openMenu={openMenu}
      onMenuOpenChange={setOpenMenu}
      onCardClick={onCardClick}
      onEdit3DotsClick={onEdit3DotsClick}
      onEditRequest={onEditRequest}
      onDialogChange={onDialogChange}
    />
  );
}

interface TaskCardPropsOrig {
  task: TaskT;
  list: TaskListT;
  disabled?: boolean;
  edit?: boolean;
  openDialog?: boolean;
  openMenu: boolean;
  onMenuOpenChange: (open: boolean) => void;
  onCardClick: () => void;
  onEdit3DotsClick: () => void;
  onEditRequest: () => void;
  onDialogChange: (open: boolean) => void;
}

export function TaskCardOrig({
                               task,
                               list: selectedList,
                               disabled,
                               edit = false,
                               openDialog,
                               openMenu,
                               onMenuOpenChange,
                               onCardClick,
                               onEdit3DotsClick,
                               onEditRequest,
                               onDialogChange,
                             }: TaskCardPropsOrig) {

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const onEditPressed = (e: Event) => {
    e.stopPropagation();
    onEdit3DotsClick();
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
  };

  return (
    <Card className={`hover:border-primary ${disabled && "bg-muted"}`}>
      <CardHeader
        onClick={onCardPressed}
        className="p-3 pb-1 flex-row justify-between items-center"
      >
        <p className="text-ellipsis overflow-hidden w-[200px]">{task.name}</p>
        <DropdownMenu onOpenChange={onMenuOpenChange} open={openMenu}>
          <DropdownMenuTrigger
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground rounded-sm"
            onClick={(e) => e.stopPropagation()}
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
          onEditRequest={onEditRequest}
          task={task}
          selectedList={selectedList}
          editMode={edit}
        />
      )}
    </Card>
  );
}

export default TaskCard;
