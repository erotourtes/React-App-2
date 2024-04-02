import AddTaskBtn from "@/components/TaskList/AddTaskBtn";
import { useGetAllTaskListsQuery } from "@redux/api/hooks";
import { useGetTasksForListQuery } from "@/redux/api/hooks";
import { TaskListT } from "@packages/types";
import ListHeader from "./ListHeader";
import TaskCard from "./TaskCard";
import { isValidIdFor } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

function TaskList({ boardId }: { boardId: number }) {
  const { data: lists = [] } = useGetAllTaskListsQuery(boardId);

  return (
    <div className="flex gap-10 flex-wrap md:flex-nowrap md:overflow-x-auto pb-5">
      {lists.map((list) => (
        <ListColumn key={list.id} list={list} />
      ))}
    </div>
  );
}

function ListColumn({ list }: { list: TaskListT }) {
  const { data: tasks = [] } = useGetTasksForListQuery(list.id);
  const isValidTask = isValidIdFor({ id: list.id });

  return (
    <div className="min-w-[250px] space-y-3">
      <ListHeader
        disabled={!isValidTask}
        list={list}
        taskCount={tasks.length}
      />
      {isValidTask ? <AddTaskBtn list={list} /> : <Skeleton className="h-10" />}
      {tasks.map((task) => (
        <TaskCard
          disabled={!isValidIdFor(task)}
          key={task.id}
          task={task}
          list={list}
        />
      ))}
    </div>
  );
}

export default TaskList;
