import { TaskListT, TaskPriority, TaskT } from "@packages/types";

export const mockTaskLists = (): TaskListT[] => [
  {
    id: 1,
    name: "List 1",
    boardId: 1
  },
  {
    id: 2,
    name: "List 2",
    boardId: 1
  }
]

export const mockTasks = (): TaskT[] => [
  {
    id: 1,
    name: "Task 1",
    list: { id: 1 },
    description: "Description 1",
    dueDate: "2022-01-01",
    priority: TaskPriority.LOW
  },
  {
    id: 2,
    name: "Task 2",
    list: { id: 1 },
    description: "Description 2",
    dueDate: "2022-01-01",
    priority: TaskPriority.MEDIUM
  }
]
