import { store } from "@/redux/store";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ListHeader from "@components/TaskList/ListHeader.tsx";

const meta: Meta<typeof ListHeader> = {
  component: ListHeader,
};

export default meta;

type Story = StoryObj<typeof ListHeader>;

export const Default: Story = {
  args: { list: { name: "List 1", id: 1, boardId: 1 }, taskCount: 1, disabled: false },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};