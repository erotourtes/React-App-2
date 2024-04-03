import NavBar from "@components/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";
import { BoardT } from "@packages/types";

interface BoardViewProps {
  board: BoardT;
  onHomeClick: () => void;
}

const BoardView = ({ board, onHomeClick }: BoardViewProps) => {
  return (
    <div>
      <div className="mb-7">
        <NavBar onHomeClick={onHomeClick} board={board}/>
      </div>
      <TaskList boardId={board.id}/>
    </div>
  )
}

export default BoardView;