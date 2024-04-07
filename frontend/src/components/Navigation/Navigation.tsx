import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import BoardPage from "@components/Board/BoardPage.tsx";

const RootWrapper = () => {
  return (
    <div className={"container p-5"}>
      <Outlet/>
    </div>
  )
}

const Navigation = () => {
  const router = createBrowserRouter([
      {
        path: "/React-App/",
        element: <RootWrapper/>,
        children: [
          {
            path: "",
            element: <BoardPage/>,
          },
        ],
      },
    ])
  ;

  return (
    <RouterProvider router={router}/>
  )
}

export default Navigation;