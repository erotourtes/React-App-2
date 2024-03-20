import { historyApi } from "@/redux/api/historyApi";
import { listsApi } from "@/redux/api/listsApi";
import { tasksApi } from "@/redux/api/tasksApi";

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
