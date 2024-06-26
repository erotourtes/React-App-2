import AllHistoryList from "@/components/TaskList/NavBar/AllHistoryList";
import CreateNewList from "@/components/TaskList/NavBar/CreateNewList";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, History } from "lucide-react";
import { H3 } from "@components/typography.tsx";
import NavBarC from "@components/NavBar.tsx"
import { BoardT } from "@packages/types";
import { Link } from "react-router-dom";
import { toHome } from "@components/Navigation/constants.ts";

interface NavBarProps {
  board: BoardT;
}

function NavBar({ board }: NavBarProps) {
  return (
    <NavBarC className={"mb-7"}>
      <Link to={toHome()}>
        <Button variant={"ghost"} className={"space-x-3 p-0"}>
          <GalleryVerticalEnd size={30}/>
          <H3>{board.name}</H3>
        </Button>
      </Link>
      <div className="space-x-0 md:space-x-5 flex flex-wrap md:flex-nowrap">
        <AllHistoryList boardId={board.id}>
          <Button variant="outline" className="gap-2">
            <History/>
            History
          </Button>
        </AllHistoryList>
        <CreateNewList boardId={board.id}/>
      </div>
    </NavBarC>
  );
}

export default NavBar;
