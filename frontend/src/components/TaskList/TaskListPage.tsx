import NavBar from "@components/TaskList/NavBar/NavBar.tsx";
import TaskList from "@components/TaskList/TaskList.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBoardById } from "@redux/api/hooks.ts";
import { toError } from "@components/Navigation/constants.ts";
import { useEffect } from "react";

const TaskListPage = () => {
  const { boardId } = useParams()
  if (!boardId) throw new Error("No board id provided")
  const navigate = useNavigate()
  const { board, isFetching, isLoading, isUninitialized } = useGetBoardById(+boardId)

  useEffect(() => {
    if (isFetching || isLoading || isUninitialized || board !== null) return
    navigate(toError(), {
      replace: true,
      state: { message: `Board with id ${boardId} not found` }
    })
  }, [board, isFetching, isLoading, navigate, boardId, isUninitialized])

  if (isFetching || isLoading || board === null) return <></>

  return (
    <div>
      <NavBar board={board}/>
      <TaskList boardId={board.id}/>
    </div>
  )
}

export default TaskListPage;