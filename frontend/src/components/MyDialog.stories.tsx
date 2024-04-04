import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import MyDialog from "@components/MyDialog.tsx";

const meta: Meta<typeof MyDialog> = {
  component: MyDialog,
};

export default meta;

type Story = StoryObj<typeof MyDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    onDialogChange: fn(),
    children: "Hello, World!",
  },
};
