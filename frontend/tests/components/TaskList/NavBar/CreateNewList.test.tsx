import { render } from "@testing-library/react";
import CreateNewList from "@components/TaskList/NavBar/CreateNewList.tsx";
import userEvent from '@testing-library/user-event'
import { useCreateNewListMutation } from "@redux/api/hooks.ts";

jest.mock("@/redux/api/wsService.ts");
jest.mock("@/redux/api/hooks.ts");

describe("CreateNewList", () => {
  it("should be clicked ", async () => {
    const createNewList = jest.mocked(useCreateNewListMutation)
    const { getByText } = render(<CreateNewList boardId={1}/>);

    const createBtn = getByText(/Create new list/i);
    await userEvent.click(createBtn);
    const submitBtn = getByText("Create");
    await userEvent.click(submitBtn);

    expect(createNewList).toHaveBeenCalled()
  });
})
