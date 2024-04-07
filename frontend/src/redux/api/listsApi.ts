import { api } from "@/redux/api/apiSlice";
import {
  CreateTaskListDto,
  HistoryT,
  TaskListT,
  UpdateTaskListDto,
} from "@packages/types";
import config from "@/config.ts";
import { byCreatedAt } from "@/utils/utils.ts";
import { historyApi } from "@redux/api/historyApi.ts";

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
            (lists) => [...lists, { ...list, id: randId, createdAt: new Date().toISOString() }].sort(byCreatedAt)
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
        queryFulfilled
          .then(() => {
            const renameHistoryList = (history: HistoryT) => {
              if (history.fieldName === "list") {
                if (+history.newValue! === list.id) history.data.newListName = list.name;
                if (+history.oldValue! === list.id) history.data.oldListName = list.name;
              }
            }
            dispatch(
              historyApi.util.updateQueryData(
                "getAllHistory",
                list.boardId,
                (draft) => void draft?.forEach(renameHistoryList))
            )
            dispatch(
              historyApi.util.updateQueryData(
                "getHistoryForTask",
                list.boardId,
                (draft) => void draft?.forEach(renameHistoryList))
            )
          })
          .catch(() => {
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
