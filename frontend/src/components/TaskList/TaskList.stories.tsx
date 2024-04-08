import { store } from "@/redux/store";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ListColumn } from "@components/TaskList/TaskList.tsx";

const meta: Meta<typeof ListColumn> = {
  component: ListColumn,
};

export default meta;

type Story = StoryObj<typeof ListColumn>;

export const Default: Story = {
  args: { list: { name: "List 1", id: 1, boardId: 1 } },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};