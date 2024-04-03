import { api } from "@/redux/api/apiSlice";
import {
  CreateTaskListDto,
  TaskListT,
  UpdateTaskListDto,
} from "@packages/types";
import config from "@/config.ts";

export const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<TaskListT[], number>({
      keepUnusedDataFor: config.CACHE_TIME,
      query: (boardId) => `task-lists?boardId=${boardId}`,
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
            list.boardId,
            (lists) => [...lists, { ...list, id: randId }]
          )
        );
        queryFulfilled
          .then(({ data: list }) => {
            dispatch(
              listsApi.util.updateQueryData(
                "getAllTaskLists",
                list.boardId,
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
          listsApi.util.updateQueryData(
            "getAllTaskLists",
            list.boardId,
            (lists) =>
              lists.map((l) => (l.id === list.id ? { ...l, ...list } : l))
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error updating list");
          patchResult.undo();
        });
      },
    }),
    deleteNewList: builder.mutation<void, TaskListT>({
      query: (list) => ({
        url: `task-lists/${list.id}`,
        method: "DELETE",
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          listsApi.util.updateQueryData(
            "getAllTaskLists",
            list.boardId,
            (lists) => lists.filter((l) => l.id !== list.id)
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
