import { api } from "@/redux/api/apiSlice";
import {
  CreateTaskListDto,
  TaskListT,
  UpdateTaskListDto,
} from "@packages/types";

export const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<TaskListT[], void>({
      query: () => `task-lists`,
    }),
    createNewList: builder.mutation<TaskListT, CreateTaskListDto>({
      query: (list) => ({
        url: `task-lists`,
        method: "POST",
        body: list,
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const randId = -Math.floor(Math.random() * 1000);
        const patchResult = dispatch(
          listsApi.util.updateQueryData(
            "getAllTaskLists",
            undefined,
            (lists) => [...lists, { ...list, id: randId }]
          )
        );
        queryFulfilled
          .then(({ data: list }) => {
            dispatch(
              listsApi.util.updateQueryData(
                "getAllTaskLists",
                undefined,
                (lists) => lists.map((l) => (l.id === randId ? list : l))
              )
            );
          })
          .catch((err) => {
            console.log("Error creating list", err);
            patchResult.undo();
          });
      },
    }),
    updateNewList: builder.mutation<UpdateTaskListDto, TaskListT>({
      query: (list) => ({
        url: `task-lists/${list.id}`,
        method: "PATCH",
        body: list,
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          listsApi.util.updateQueryData("getAllTaskLists", undefined, (lists) =>
            lists.map((l) => (l.id === list.id ? { ...l, ...list } : l))
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error updating list");
          patchResult.undo();
        });
      },
    }),
    deleteNewList: builder.mutation<void, number>({
      query: (id) => ({
        url: `task-lists/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          listsApi.util.updateQueryData("getAllTaskLists", undefined, (lists) =>
            lists.filter((l) => l.id !== id)
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error deleting list");
          patchResult.undo();
        });
      },
    }),
  }),
  overrideExisting: false,
});
