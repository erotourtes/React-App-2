export enum HistoryActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type HistoryT = {
  id: number;
  actionType: HistoryActionType;
  timestamp: string;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  recordId: number;
  boardId: number;
  task: {
    name: string;
  };
};

export type HistoryServerT = {
  [K in keyof HistoryT]: K extends "timestamp" ? Date : HistoryT[K];
};
