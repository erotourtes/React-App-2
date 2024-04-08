import { Meta, StoryObj } from "@storybook/react";
import NavBar from "@components/TaskList/NavBar/NavBar.tsx";
import { store } from "@redux/store.ts";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: { board: { name: "Board 1", id: 1 }, },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};