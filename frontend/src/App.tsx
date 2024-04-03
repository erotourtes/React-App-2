import { Toaster } from "sonner";
import "./App.css";
import BoardSelectPage from "@components/Board/BoardSelectPage.tsx";
import { useState } from "react";
import BoardView from "@components/Board/BoardView.tsx";

function App() {
  const [boardId, setBoardId] = useState<number | null>(null);

  return (
    <>
      <div className="container p-5">
        {boardId
          ? <BoardView boardId={boardId} onHomeClick={() => setBoardId(0)}/>
          : <BoardSelectPage onSelect={setBoardId}/>
        }
      </div>
      <Toaster/>
    </>
  );
}

export default App;
