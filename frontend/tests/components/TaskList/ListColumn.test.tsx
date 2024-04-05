import { TaskListT, TaskPriority, TaskT } from "@packages/types";
import { render } from "@testing-library/react";
import { ListColumn } from "@components/TaskList/TaskList.tsx";
import fetchMock from "jest-fetch-mock";
import { MockHooksT } from "../../test-utils.ts";
import { useGetTasksForListQuery } from "@redux/api/hooks.ts";

jest.mock("@/redux/api/wsService.ts");
jest.mock("@/redux/api/errorMiddleware.ts")

// TODO: can't setup manual mock for useGetTasksForListQuery
jest.mock("@/redux/api/hooks.ts", (): MockHooksT => ({
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
}));

let list: TaskListT
let tasks: TaskT[]
describe("ListColumn", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    list = {
      id: 1,
      name: "List 1",
      boardId: 1,
    }
    tasks = [
      {
        id: 1,
        name: "Task 1",
        list: { id: 1 },
        description: "Description 1",
        dueDate: "2022-01-01",
        priority: TaskPriority.LOW
      },
      {
        id: 2,
        name: "Task 2",
        list: { id: 1 },
        description: "Description 2",
        dueDate: "2022-01-01",
        priority: TaskPriority.MEDIUM
      }
    ]
  })
  ;

  it("should have skeleton", () => {
    list.id = -1;
    const { getByTestId } = render(<ListColumn list={list}/>);

    const skeleton = getByTestId("list-column-skeleton");

    expect(skeleton).toBeInTheDocument();
  });

  it("should have tasks", () => {
    jest.mocked(useGetTasksForListQuery).mockReturnValue({ data: tasks, refetch: jest.fn() })

    const { getByText } = render(<ListColumn list={list}/>);

    expect(getByText(tasks[0].name)).toBeInTheDocument();
    expect(getByText(tasks[1].name)).toBeInTheDocument();
  });
});