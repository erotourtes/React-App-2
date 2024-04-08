import CreateNewBoardDialog from "@components/Board/CreateNewBoardDialog.tsx";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof CreateNewBoardDialog> = {
  component: CreateNewBoardDialog,
};

export default meta;

type Story = StoryObj<typeof CreateNewBoardDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    onDialogChange: fn(),
    onDialogSubmit: fn(),
  },
};
