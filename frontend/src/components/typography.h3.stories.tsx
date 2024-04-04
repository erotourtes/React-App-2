import { Meta, StoryObj } from "@storybook/react";
import { H3 } from "./typography";

const meta: Meta<typeof H3> = {
  component: H3,
  title: "Typography/H3",
};

export default meta;

type Story = StoryObj<typeof H3>;

export const Default: Story = {
  args: {
    children: "Hello, World!",
  },
};
