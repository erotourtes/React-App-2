import { api } from "@/redux/api/apiSlice";
import {
  CreateTaskDto,
  TaskT,
  UpdateTaskDto,
} from "@packages/types";
import config from "@/config.ts";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasksForList: builder.query<TaskT[], number>({
      keepUnusedDataFor: config.CACHE_TIME,
      query: (list: number) => `tasks/?listId=${list}`,
    }),
    updateTask: builder.mutation<
      TaskT,
      { oldTask: TaskT; updatedTask: UpdateTaskDto }
    >({
      query: ({ updatedTask }) => ({
        url: `tasks/${updatedTask.id}`,
        method: "PATCH",
        body: { ...updatedTask },
      }),
      onQueryStarted({ oldTask, updatedTask }, { dispatch, queryFulfilled }) {
        // TODO: REFACTOR THIS
        const isTaskListSame =
          !updatedTask.listId || updatedTask.listId === oldTask.list.id;
        if (isTaskListSame) {
          const patchResult = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              oldTask.list.id,
              (tasks) =>
                tasks.map((t) =>
                  t.id === updatedTask.id ? { ...t, ...updatedTask } : t
                )
            )
          );
          queryFulfilled.catch(() => {
            console.log("Error updating task");
            patchResult.undo();
          });
        } else {
          const patcheRemove = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              oldTask.list.id,
              (tasks) => {
                return tasks.filter((t) => t.id !== updatedTask.id);
              }
            )
          );
          const newTask: TaskT = {
            ...oldTask,
            list: { id: updatedTask.listId! },
          };
          const patchAdd = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              updatedTask.listId!,
              (tasks) => [...tasks, newTask]
            )
          );
          queryFulfilled.catch(() => {
            console.log("Error updating task");
            patcheRemove.undo();
            patchAdd.undo();
          });
        }
      },
    }),
    deleteTask: builder.mutation<void, TaskT>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "DELETE",
      }),
      onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasksForList",
            task.list.id,
            (tasks) => tasks.filter((t) => t.id !== task.id)
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error deleting task");
          patchResult.undo();
        });
      },
    }),
    createNewTask: builder.mutation<TaskT, CreateTaskDto & { listId: number }>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: { ...task }, // Wut, need to { ...destructure?
      }),
      onQueryStarted(task, { dispatch, queryFulfilled }) {
        const randId = -Math.floor(Math.random() * 1000);
        const newTask: TaskT = {
          id: randId,
          ...task,
          list: {
            id: task.listId,
          },
        };
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasksForList",
            task.listId,
            (tasks) => [...tasks, newTask]
          )
        );

        queryFulfilled
          .then(({ data: task }) => {
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasksForList",
                task.list.id,
                (tasks) => tasks.map((t) => (t.id === randId ? task : t))
              )
            );
          })
          .catch(() => {
            console.log("Error creating task");
            patchResult.undo();
          });
      },
    }),
  }),
});
