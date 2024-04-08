import { store } from "@/redux/store";
import AddTaskBtn from "@components/TaskList/AddTaskBtn.tsx";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof AddTaskBtn> = {
  component: AddTaskBtn,
};

export default meta;

type Story = StoryObj<typeof AddTaskBtn>;

export const Default: Story = {
  args: { list: { name: "List 1", id: 1, boardId: 1 } },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};