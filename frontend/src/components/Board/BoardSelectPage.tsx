import { useCreateBoardMutation, useGetAllBoardsQuery } from "@redux/api/hooks.ts";
import { H3, H4 } from "@components/typography.tsx";
import { BoardT } from "@packages/types";
import { Card } from "@components/ui/card.tsx";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog.tsx";
import { Label } from "@components/ui/label.tsx";
import { Input } from "@components/ui/input.tsx";
import { inputChange } from "@/utils/utils.ts";
import { Button } from "@components/ui/button.tsx";
import { useState } from "react";

const BoardSelectPage = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const { data: boards = [] } = useGetAllBoardsQuery();
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createBoard] = useCreateBoardMutation()

  const createBoardSubmit = (name: string) => {
    setDialogOpen(false)
    createBoard({ name })
  }

  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center mb-7">
        <H3>Boards</H3>
      </nav>
      <div className={"flex gap-3"}>
        {boards.map((board) => (
          <Board onClick={onSelect}
                 className={"w-[250px] h-[200px] flex justify-center items-center cursor-pointer hover:border-primary"}
                 board={board}
                 key={board.id}/>
        ))}
        <Card
          onClick={() => setDialogOpen(true)}
          className={"w-[250px] h-[200px] flex justify-center items-center hover:bg-primary hover:text-primary-foreground transition-colors"}>
          <Plus size={75}/>
        </Card>
      </div>

      {dialogOpen && (
        <CreateNewBoardDialog isOpen={dialogOpen} onDialogChange={setDialogOpen} onDialogSubmit={createBoardSubmit}/>
      )}
    </div>
  )
}

interface CreateNewBoardDialogProps {
  isOpen: boolean
  onDialogChange: (open: boolean) => void,
  onDialogSubmit: (name: string) => void
}

const CreateNewBoardDialog = (
  {
    isOpen,
    onDialogChange,
    onDialogSubmit
  }: CreateNewBoardDialogProps
) => {
  const [name, setName] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Board</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-center">
            Name
          </Label>
          <Input
            onChange={inputChange(setName)}
            id="name"
            defaultValue="Board 1"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onDialogSubmit(name)} type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
const Board = ({ board, onClick, className }: {
  board: BoardT,
  onClick: (boardId: number) => void,
  className?: string
}) => {
  return (
    <Card onClick={() => onClick(board.id)} className={className}>
      <H4>
        {board.name}
      </H4>
    </Card>
  )
}

export default BoardSelectPage;