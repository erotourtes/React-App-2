import MyDialog from "@/components/MyDialog";
import { TaskForm } from "@/components/TaskList/TaskForm";
import { H3 } from "@/components/typography";
import { useGetHistoryForTaskQuery } from "@/redux/api/hooks";
import {
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/api/hooks";
import { CreateTaskDto, TaskListT, TaskT } from "@packages/types";
import { useState } from "react";
import TaskHistoryList from "@/components/TaskList/HistoryList";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  selectedList: TaskListT;
  isEdit?: boolean;
  onEditRequest?: () => void;
  task?: TaskT;
  onSubmit: (data: CreateTaskDto) => void;
};

const EditTaskDialog = ({
                          onDialogChange,
                          isOpen,
                          selectedList,
                          task,
                          editMode = true,
                        }: Omit<TaskDialogProps, "onSubmit"> & { editMode: boolean }) => {
  if (!task) throw new Error("Task is required");
  const [isEdit, setIsEdit] = useState(editMode);
  const [update] = useUpdateTaskMutation();
  const { data: historyList = [] } = useGetHistoryForTaskQuery(task.id);

  const dialogChange = (open: boolean) => {
    setIsEdit(false);
    onDialogChange(open);
  };

  const submit = (data: CreateTaskDto) => {
    const updatedTask = { ...data, id: task.id };
    update({ oldTask: task, updatedTask });
    onDialogChange(false);
  };

  return (
    <MyDialog isOpen={isOpen} onDialogChange={dialogChange}>
      <div className="flex flex-wrap md:flex-nowrap min-h-full">
        <div className="w-full md:w-3/5 p-5">
          <TaskForm
            onSubmit={submit}
            edit={isEdit}
            onEditRequest={() => setIsEdit(true)}
            task={task}
            selectedList={selectedList}
          />
        </div>
        <div className="p-5 bg-secondary min-h-full w-2/5 min-w-full md:min-w-[300px]">
          <H3>Task Action</H3>
          <TaskHistoryList history={historyList}/>
        </div>
      </div>
    </MyDialog>
  );
};

const AddTaskDialog = ({
                         onDialogChange,
                         isOpen,
                         selectedList,
                       }: Omit<TaskDialogProps, "task" | "onSubmit">) => {
  const [create] = useCreateNewTaskMutation();

  const submit = (data: CreateTaskDto) => {
    create(data);
    onDialogChange(false);
  };

  return (
    <MyDialog isOpen={isOpen} onDialogChange={onDialogChange}>
      <div className="p-5">
        <TaskForm onSubmit={submit} selectedList={selectedList} edit={true}/>
      </div>
    </MyDialog>
  );
};

export { EditTaskDialog, AddTaskDialog };
