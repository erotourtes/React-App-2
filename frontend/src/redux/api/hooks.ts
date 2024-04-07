import * as historyApi from "@/redux/api/historyApi";
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

export const { useGetAllHistoryQuery } = historyApi.historyApi;
export const { useGetHistoryForTask } = historyApi;

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardApi
