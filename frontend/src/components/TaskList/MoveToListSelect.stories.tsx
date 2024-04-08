import { store } from "@/redux/store";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import MoveToListSelect from "@components/TaskList/MoveToListSelect.tsx";
import { fn } from "@storybook/test";

const meta: Meta<typeof MoveToListSelect> = {
  component: MoveToListSelect,
};

export default meta;

type Story = StoryObj<typeof MoveToListSelect>;

export const Default: Story = {
  args: { boardId: 1, disabled: false, onSelect: fn(), selectedListId: 2, placeholder: "Move to list" },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};