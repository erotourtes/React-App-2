import { Meta, StoryObj } from "@storybook/react";
import  NavBar  from "@components/NavBar.tsx";
import { HomeIcon, UserRoundIcon } from "lucide-react";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {
    children: <>
      <HomeIcon />
      <UserRoundIcon />
    </>,
  },
};

export const Primary: Story = {
  args: {
    className: "bg-primary text-primary-foreground",
    children: <>
      <HomeIcon />
      <UserRoundIcon />
    </>,
  },
};
