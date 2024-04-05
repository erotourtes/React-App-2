import { TaskListT, TaskT } from "@packages/types";
import { render } from "@testing-library/react";
import { ListColumn } from "@components/TaskList/TaskList.tsx";
import { useGetTasksForListQuery } from "@redux/api/hooks.ts";
import { mockTaskLists, mockTasks } from "../../__mocks__/typeMocks.ts";

jest.mock("@/redux/api/wsService.ts");
jest.mock("@/redux/api/hooks.ts");

describe("ListColumn", () => {
  let list: TaskListT
  let tasks: TaskT[]

  beforeEach(() => {
    list = mockTaskLists()[0]
    tasks = mockTasks()
  });

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