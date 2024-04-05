import { TaskListT, TaskT } from "@packages/types";
import { mockTaskLists, mockTasks } from "../../__mocks__/typeMocks.ts";
import { render } from "@testing-library/react";
import { EditTaskDialog } from "@/components/TaskList/TaskEditDialog";

jest.mock("@/redux/api/wsService.ts");
jest.mock("@/redux/api/hooks.ts");

describe("TaskCard", () => {
  let list: TaskListT
  let task: TaskT
  beforeEach(() => {
    list = mockTaskLists()[0]
    task = mockTasks()[0]
  })

  it('should throw on undefined task', async () => {
    expect(() =>
      render(
        <EditTaskDialog onDialogChange={jest.fn()} isOpen={true} selectedList={list} editMode={false}/>
      )).toThrow()
  });

  it("should have edit btn", () => {
    const { queryByText } = render(
      <EditTaskDialog onDialogChange={jest.fn()} isOpen={true} selectedList={list} editMode={false} task={task}/>
    );

    expect(queryByText(/^edit task$/i)).toBeInTheDocument();
    expect(queryByText(/^submit$/i)).not.toBeInTheDocument();
  });

  it("should have submit btn", () => {
    const { queryByText } = render(
      <EditTaskDialog onDialogChange={jest.fn()} isOpen={true} selectedList={list} editMode={true} task={task}/>
    );

    expect(queryByText(/^edit task$/i)).not.toBeInTheDocument();
    expect(queryByText(/^submit$/i)).toBeInTheDocument();
  });
})
