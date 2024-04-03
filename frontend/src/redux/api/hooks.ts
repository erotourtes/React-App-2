import { historyApi } from "@/redux/api/historyApi";
import { listsApi } from "@/redux/api/listsApi";
import { tasksApi } from "@/redux/api/tasksApi";
import { boardApi } from "@redux/api/boardApi.ts";

export const {
  useGetTasksForListQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export const {
  useGetAllTaskListsQuery,
  useCreateNewListMutation,
  useUpdateNewListMutation,
  useDeleteNewListMutation,
} = listsApi;

export const { useGetHistoryForTaskQuery, useGetAllHistoryQuery } = historyApi;

export const {
  useGetAllBoardsQuery,
  useGetBoardListsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardApi
