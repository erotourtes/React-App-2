import { Board } from "@components/Board/Board.tsx";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Board> = {
  component: Board,
};

export default meta;

type Story = StoryObj<typeof Board>;

export const Default: Story = {
  args: {
    board: { name: "Board 1", id: 1 },
  },
};
