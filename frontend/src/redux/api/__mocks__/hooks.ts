import { MockHooksT } from "../../../../tests/test-utils.ts";

const mockedModule: MockHooksT = {
  useDeleteNewListMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useUpdateNewListMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useGetTasksForListQuery: jest.fn(() => ({ data: [] })),
  useDeleteTaskMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useUpdateTaskMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useGetAllTaskListsQuery: jest.fn(() => ({ data: [] })),
  useCreateNewListMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useCreateNewTaskMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useCreateBoardMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useDeleteBoardMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useUpdateBoardMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useGetAllBoardsQuery: jest.fn(() => ({ data: [] })),
  useGetAllHistoryQuery: jest.fn(() => ({ data: [] })),
  useGetHistoryForTaskQuery: jest.fn(() => ({ data: [] })),
};

export const {
  useDeleteNewListMutation,
  useUpdateNewListMutation,
  useGetTasksForListQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetAllTaskListsQuery,
  useCreateNewListMutation,
  useCreateNewTaskMutation,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetAllBoardsQuery,
  useGetAllHistoryQuery,
  useGetHistoryForTaskQuery
} = mockedModule;