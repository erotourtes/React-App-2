import AllHistoryList from "@/components/NavBar/AllHistoryList";
import CreateNewList from "@/components/NavBar/CreateNewList";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, History } from "lucide-react";
import { H3 } from "../typography";
import { PopupIcon } from "@components/popmenu-utils.tsx";

interface NavBarProps {
  boardId: number;
  onHomeClick: () => void;
}

function NavBar({ boardId, onHomeClick }: NavBarProps) {
  return (
    <nav className="flex flex-wrap justify-between items-center">
      <H3>My Task Board</H3>
      <div className="space-x-0 md:space-x-5 flex flex-wrap md:flex-nowrap">
        <Button onClick={onHomeClick} variant={"ghost"}>
          <PopupIcon icon={<GalleryVerticalEnd/>}/> Home
        </Button>
        <AllHistoryList boardId={boardId}>
          <Button variant="outline" className="gap-2">
            <History/>
            History
          </Button>
        </AllHistoryList>
        <CreateNewList boardId={boardId}/>
      </div>
    </nav>
  );
}

export default NavBar;
