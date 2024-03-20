export enum HistoryActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type HistoryT = {
  id: string;
  actionType: HistoryActionType;
  timestamp: string;
  tableName: string;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  recordId: string;
  name: string;
};
