import { Meta, StoryObj } from "@storybook/react";
import { store } from "@redux/store.ts";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CreateNewList from "@components/TaskList/NavBar/CreateNewList.tsx";

const meta: Meta<typeof CreateNewList> = {
  component: CreateNewList,
};

export default meta;

type Story = StoryObj<typeof CreateNewList>;

export const Default: Story = {
  args: { boardId: 1 },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};