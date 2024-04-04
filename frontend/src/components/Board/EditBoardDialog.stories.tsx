import EditBoardDialog from "@components/Board/EditBoardDialog.tsx";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EditBoardDialog> = {
  component: EditBoardDialog,
};

export default meta;

type Story = StoryObj<typeof EditBoardDialog>;

export const Default: Story = {
  args: {
    board: { name: "Board 1", id: 1 },
    open: true,
  },
};
