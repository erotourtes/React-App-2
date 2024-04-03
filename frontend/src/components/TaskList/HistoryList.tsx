import { TaskHistory } from "@/components/TaskHistory";
import { HistoryT } from "@packages/types";

const TaskHistoryList = ({ history }: { history: HistoryT[] }) => {
  if (!history || history.length == 0) return null;
  return (
    <div>
      <ul className="list-disc space-y-5 overflow-auto">
        {history.map((h) => (
          <TaskHistory key={h.id} history={h} />
        ))}
      </ul>
    </div>
  );
};

export default TaskHistoryList;
