import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import BoardPage from "@components/Board/BoardPage.tsx";
import TaskListPage from "@components/TaskList/TaskListPage.tsx";
import { BASE_URL, BOARD_URL } from "@components/Navigation/constants.ts";
import ErrorPage from "@components/Navigation/ErrorPage.tsx";

const RootWrapper = () => (<div className={"container p-5"}><Outlet/></div>)

const Navigation = () => {
  const router = createBrowserRouter([
      {
        path: BASE_URL,
        element: <RootWrapper/>,
        errorElement: <ErrorPage/>,
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