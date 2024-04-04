import NavBar from "@components/TaskList/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";
import { BoardT } from "@packages/types";

interface TaskListPageProps {
  board: BoardT;
  onHomeClick: () => void;
}

const TaskListPage = ({ board, onHomeClick }: TaskListPageProps) => {
  return (
    <div>
      <NavBar onHomeClick={onHomeClick} board={board}/>
      <TaskList boardId={board.id}/>
    </div>
  )
}

export default TaskListPage;