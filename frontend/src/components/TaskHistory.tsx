import { strDateFormat, strDateFormatMAT } from "@/utils/utils";
import { HistoryT, TaskT, HistoryActionType } from "@packages/types";
import { CircleDot } from "lucide-react";
import { ReactElement } from "react";

export const TaskHistory = ({ history }: { history: HistoryT }) => {
  return (
    <li className="flex justify-between flex-wrap">
      <div>{actionRemapper[history.actionType](history)}</div>
      <span className="min-w-fit">{strDateFormatMAT(history.timestamp)}</span>
    </li>
  );
};

const actionRemapper: Record<HistoryActionType, (h: HistoryT) => ReactElement> =
  {
    [HistoryActionType.CREATE]: (history) => (
      <p>You created task {value(history.task.name)}</p>
    ),
    [HistoryActionType.UPDATE]: (history) => (
      <p>{taskRemapper[history.fieldName as keyof TaskT](history)}</p>
    ),
    [HistoryActionType.DELETE]: (history) => (
      <p>You deleted task {value(history.task.name)}</p>
    ),
  };

const value = (value?: string) => {
  return (
    <span>
      <CircleDot className="inline-block h-4 w-4 mr-1" />
      <strong>{value ? value : "<empty>"}</strong>
    </span>
  );
};

const taskRemapper: Record<
  keyof TaskT,
  (history: HistoryT) => React.ReactElement
> = {
  id: () => <span></span>,
  name: (history: HistoryT) => (
    <span>
      You renamed task from {value(history.oldValue)} to{" "}
      {value(history.newValue)}{" "}
    </span>
  ),
  description: (history: HistoryT) =>
    !history.oldValue ? (
      <span>You added description {value(history.newValue)}</span>
    ) : (
      <span>
        You changed description from {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    ),
  list: (history: HistoryT) => {
    return (
      <span>
        You moved task from list {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    );
  },
  priority: (history: HistoryT) =>
    !history.oldValue ? (
      <span>You added priority {value(history.newValue)}</span>
    ) : (
      <span>
        You changed priority from {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    ),
  dueDate: (history: HistoryT) =>
    !history.oldValue || history.oldValue === "" ? (
      <span>You added due date {value(strDateFormat(history.newValue))}</span>
    ) : (
      <span>
        You changed due date from {value(strDateFormat(history.oldValue))} to{" "}
        {value(strDateFormat(history.newValue))}
      </span>
    ),
  createdAt: () => <span></span>,
};
