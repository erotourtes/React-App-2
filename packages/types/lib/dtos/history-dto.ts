export enum HistoryActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type HistoryT = {
  id: number;
  actionType: HistoryActionType;
  timestamp: string | Date;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  recordId: number;
  boardId: number;
  task: {
    name: string;
  };
} & (
  | {
      fieldName: "list";
      data: {
        oldListName: string;
        newListName: string;
      };
    }
  | {
      fieldName: Exclude<string, "list">;
      data: never;
    }
);
