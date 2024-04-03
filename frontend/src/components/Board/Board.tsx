import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem, ContextMenuLabel,
  ContextMenuTrigger
} from "@components/ui/context-menu.tsx";
import { Card } from "@components/ui/card.tsx";
import { H4 } from "@components/typography.tsx";
import { BoardT } from "@packages/types";
import EditBoardDialog from "@components/Board/EditBoardDialog.tsx";
import { useState } from "react";

export const Board = ({ board, onClick, onDelete, onEdit }: {
  board: BoardT,
  onClick: (boardId: number) => void,
  onEdit: (board: BoardT) => void,
  onDelete: (board: BoardT) => void,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Card onClick={() => onClick(board.id)} className={"w-[250px] h-[200px] cursor-pointer hover:border-primary"}>
            <div className={"flex justify-center items-center flex-col h-full"}>
              <H4>
                {board.name || "<empty>"}
              </H4>
              <p className={"opacity-grayish"}>
                Right click for more options
              </p>
            </div>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>{board.name || "<empty>"}</ContextMenuLabel>
            <ContextMenuItem onClick={() => setEditDialogOpen(true)}>Edit</ContextMenuItem>
            <ContextMenuItem className={"des-btn focus:des-btn-rev"}
                             onClick={() => onDelete(board)}>Delete</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      {editDialogOpen && (
        <EditBoardDialog board={board} open={editDialogOpen} onDialogChange={setEditDialogOpen} onSubmit={onEdit}/>
      )}
    </>
  )
}