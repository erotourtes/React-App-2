import { Meta, StoryObj } from "@storybook/react";
import { PopupIcon } from "@components/popmenu-utils.tsx";
import { HomeIcon } from "lucide-react";

const meta: Meta<typeof PopupIcon> = {
  component: PopupIcon,
};

export default meta;

type Story = StoryObj<typeof PopupIcon>;

export const Default: Story = {
  args: {
    icon: <HomeIcon />
  },
};
