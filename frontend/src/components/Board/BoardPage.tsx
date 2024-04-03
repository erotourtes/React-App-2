import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation
} from "@redux/api/hooks.ts";
import { H3 } from "@components/typography.tsx";
import { Card } from "@components/ui/card.tsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateNewBoardDialog } from "@components/Board/CreateNewBoardDialog.tsx";
import { Board } from "@components/Board/Board.tsx";
import { BoardT } from "@packages/types";

const BoardPage = ({ boards, onSelect }: { boards: BoardT[], onSelect: (id: number) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createBoard] = useCreateBoardMutation()

  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const createBoardSubmit = (name: string) => {
    setDialogOpen(false)
    createBoard({ name })
  }

  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center mb-7">
        <H3>Boards</H3>
      </nav>
      <div className={"flex gap-3 flex-wrap"}>
        {boards.map((board) => (
          <Board onClick={onSelect}
                 onEdit={updateBoard}
                 onDelete={deleteBoard}
                 board={board}
                 key={board.id}/>
        ))}
        <Card
          onClick={() => setDialogOpen(true)}
          className={"w-[250px] h-[200px] flex justify-center items-center border-dashed hover:border-0 hover:border-primary  border-2 hover:bg-primary hover:text-primary-foreground transition-colors"}>
          <Plus size={75}/>
        </Card>
      </div>

      {dialogOpen && (
        <CreateNewBoardDialog isOpen={dialogOpen} onDialogChange={setDialogOpen} onDialogSubmit={createBoardSubmit}/>
      )}
    </div>
  )
}

export default BoardPage;