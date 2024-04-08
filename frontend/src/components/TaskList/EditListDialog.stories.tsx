import { store } from "@/redux/store";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import EditListDialog from "@components/TaskList/EditListDialog.tsx";
import { fn } from "@storybook/test";

const meta: Meta<typeof EditListDialog> = {
  component: EditListDialog,
};

export default meta;

type Story = StoryObj<typeof EditListDialog>;

export const Default: Story = {
  args: { list: { name: "List 1", id: 1, boardId: 1 }, onSubmit: fn(), onDialogChange: fn(), open: true },
  decorators: [(Story) => (
    <Provider store={store}><MemoryRouter><Story/></MemoryRouter></Provider>
  )]
};