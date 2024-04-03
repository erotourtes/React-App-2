import { Toaster } from "sonner";
import "./App.css";
import BoardSelectPage from "@components/Board/BoardSelectPage.tsx";
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
          : <BoardSelectPage boards={boards} onSelect={setBoardId}/>
        }
      </div>
      <Toaster/>
    </>
  );
}

export default App;
