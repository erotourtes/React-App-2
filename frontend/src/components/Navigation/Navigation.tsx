import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import BoardPage from "@components/Board/BoardPage.tsx";
import TaskListPage from "@components/TaskList/TaskListPage.tsx";

const RootWrapper = () => (<div className={"container p-5"}><Outlet/></div>)
const BASE_URL = "React-App";
const BOARD_URL = "board";

export const toBoard = (boardId: number) => `/${BASE_URL}/${BOARD_URL}/${boardId}`;
export const toHome = () => `/${BASE_URL}`;

const Navigation = () => {
  const router = createBrowserRouter([
      {
        path: BASE_URL,
        element: <RootWrapper/>,
        children: [
          {
            path: "",
            element: <BoardPage/>,
          },
          {
            path: BOARD_URL + "/:boardId",
            element: <TaskListPage/>,
          }
        ],
      },
    ])
  ;

  return (
    <RouterProvider router={router}/>
  )
}

export default Navigation;