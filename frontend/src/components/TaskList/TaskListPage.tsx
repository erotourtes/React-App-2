import NavBar from "@components/TaskList/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBoardById } from "@redux/api/hooks.ts";
import { useCallback } from "react";
import { toError, toHome } from "@components/Navigation/constants.ts";

const TaskListPage = () => {
  const { boardId } = useParams()
  if (!boardId) throw new Error("No board id provided")
  const navigate = useNavigate()
  const onHomeClick = useCallback(() => navigate(toHome()), [navigate])
  const { board, isFetching, isLoading } = useGetBoardById(+boardId)

  if (isFetching || isLoading) return <></>
  if (board === null) return void navigate(toError(), {
    replace: true,
    state: { message: `Board with id ${boardId} not found` }
  })

  return (
    <div>
      <NavBar onHomeClick={onHomeClick} board={board}/>
      <TaskList boardId={board.id}/>
    </div>
  )
}

export default TaskListPage;