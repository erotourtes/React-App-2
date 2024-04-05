import { TaskListT } from "@packages/types";
import { mockTaskLists } from "../../__mocks__/typeMocks.ts";
import ListHeader from "@/components/TaskList/ListHeader.tsx";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

jest.mock("@/redux/api/wsService.ts");
jest.mock("@/redux/api/hooks.ts");

describe("ListHeader", () => {
  let list: TaskListT
  beforeEach(() => {
    list = mockTaskLists()[0]
  })

  it('should contains list name', () => {
    const { getByText } = render(<ListHeader list={list} taskCount={0}/>);

    expect(getByText(list.name)).toBeInTheDocument();
  });

  it('should open edit dialog', async () => {
    const { getByTestId, getByText } = render(<ListHeader list={list} taskCount={0} disabled={false}/>);

    const btn = getByTestId("list-header-ellipsis-menu")
    await userEvent.click(btn)

    expect(getByText(/edit/i)).toBeInTheDocument();
    expect(getByText(/delete/i)).toBeInTheDocument();
  });

  it('should not open disabled edit dialog', async () => {
    list.id = -1;
    const { getByTestId, queryByText } = render(<ListHeader list={list} taskCount={0} disabled={true}/>);

    const btn = getByTestId("list-header-ellipsis-menu")
    await userEvent.click(btn)

    expect(queryByText(/edit/i)).not.toBeInTheDocument();
    expect(queryByText(/delete/i)).not.toBeInTheDocument();
  });
})