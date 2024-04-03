import NavBar from "@components/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";

interface BoardViewProps {
  boardId: number;
  onHomeClick: () => void;
}

const BoardView = ({ boardId, onHomeClick }: BoardViewProps) => {
  return (
    <div>
      <div className="mb-7">
        <NavBar onHomeClick={onHomeClick} boardId={boardId}/>
      </div>
      <TaskList boardId={boardId}/>
    </div>
  )
}

export default BoardView;