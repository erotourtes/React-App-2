import { Toaster } from "sonner";
import "./App.css";
import BoardPage from "@components/Board/BoardPage.tsx";
import { useState } from "react";
import { useGetAllBoardsQuery } from "@redux/api/hooks.ts";
import TaskListPage from "@components/TaskList/TaskListPage.tsx";

function App() {
  const [boardId, setBoardId] = useState<number | null>(null);
  const { data: boards = [] } = useGetAllBoardsQuery();
  const selectedBoard = boards.find(b => b.id == boardId)

  return (
    <>
      <div className="container p-5">
        {selectedBoard
          ? <TaskListPage board={selectedBoard} onHomeClick={() => setBoardId(0)}/>
          : <BoardPage boards={boards} onSelect={setBoardId}/>
        }
      </div>
      <Toaster/>
    </>
  );
}

export default App;
