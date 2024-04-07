import NavBar from "@components/TaskList/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { toHome } from "@components/Navigation/Navigation.tsx";
import { useGetBoardById } from "@redux/api/hooks.ts";
import { useCallback } from "react";

const TaskListPage = () => {
  const { boardId } = useParams()
  if (!boardId) throw new Error("No board id provided")
  const navigate = useNavigate()
  const onHomeClick = useCallback(() => navigate(toHome()), [navigate])
  const { board } = useGetBoardById(+boardId)

  if (!board) return <div>Loading...</div>

  return (
    <div>
      <NavBar onHomeClick={onHomeClick} board={board}/>
      <TaskList boardId={board.id}/>
    </div>
  )
}

export default TaskListPage;