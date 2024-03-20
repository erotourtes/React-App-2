import AllHistoryList from "@/components/NavBar/AllHistoryList";
import CreateNewList from "@/components/NavBar/CreateNewList";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { H3 } from "../typography";

function NavBar() {
  return (
    <nav className="flex flex-wrap justify-between items-center">
      <H3>My Task Board</H3>
      <div className="space-x-5 flex">
        <AllHistoryList>
          <Button variant="outline" className="gap-2">
            <History />
            History
          </Button>
        </AllHistoryList>

        <CreateNewList />
      </div>
    </nav>
  );
}

export default NavBar;
