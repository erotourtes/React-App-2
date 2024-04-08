import { Meta, StoryObj } from "@storybook/react";
import { TaskCardOrig } from "@components/TaskList/TaskCard.tsx";
import { TaskPriority } from "@packages/types";
import { Provider } from "react-redux";
import { store } from "@redux/store.ts";
import { fn } from "@storybook/test";

const meta: Meta<typeof TaskCardOrig> = {
  component: TaskCardOrig,
};

export default meta;

type Story = StoryObj<typeof TaskCardOrig>;

export const Default: Story = {
    args: {
      edit: false,
      openMenu: false,
      openDialog: false,
      disabled: false,
      onEditRequest: fn(),
      onMenuOpenChange: fn(),
      onDialogChange: fn(),
      onCardClick: fn(),
      onEdit3DotsClick: fn(),
      list: {
        id: 1,
        name: "List 1",
        boardId: 1,
      },
      task: {
        id: 1,
        description: "Task 1",
        dueDate: "2022-01-01",
        updatedAt: new Date().toISOString(),
        name: "Task 1",
        priority: TaskPriority.MEDIUM,
        list: { id: 1 }
      },
    },
    decorators: [(Story) => (
      <Provider store={store}><Story/></Provider>
    )]
  }
;
