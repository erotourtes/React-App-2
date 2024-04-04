import { Meta, StoryObj } from "@storybook/react";
import Priority from "@components/Priority.tsx";
import { TaskPriority } from "@packages/types";

const meta: Meta<typeof Priority> = {
  component: Priority,
  argTypes: {
    priority: {
      control: { type: 'select' },
      options: Object.values(TaskPriority),
    },
  }
};

export default meta;

type Story = StoryObj<typeof Priority>;

export const Default: Story = {
  args: {
    priority: TaskPriority.MEDIUM
  },
};
