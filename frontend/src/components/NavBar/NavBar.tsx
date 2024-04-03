import AllHistoryList from "@/components/NavBar/AllHistoryList";
import CreateNewList from "@/components/NavBar/CreateNewList";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, History } from "lucide-react";
import { H3 } from "../typography";
import { BoardT } from "@packages/types";

interface NavBarProps {
  board: BoardT;
  onHomeClick: () => void;
}

function NavBar({ board, onHomeClick }: NavBarProps) {
  return (
    <nav className="flex flex-wrap justify-between items-center">
      <Button variant={"ghost"} onClick={onHomeClick} className={"space-x-3 p-0"}>
        <GalleryVerticalEnd size={30}/>
        <H3>{board.name}</H3>
      </Button>
      <div className="space-x-0 md:space-x-5 flex flex-wrap md:flex-nowrap">
        <AllHistoryList boardId={board.id}>
          <Button variant="outline" className="gap-2">
            <History/>
            History
          </Button>
        </AllHistoryList>
        <CreateNewList boardId={board.id}/>
      </div>
    </nav>
  );
}

export default NavBar;
