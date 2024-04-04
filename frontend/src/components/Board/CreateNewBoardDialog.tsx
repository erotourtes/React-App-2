import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog.tsx";
import { Label } from "@components/ui/label.tsx";
import { Input } from "@components/ui/input.tsx";
import { inputChange } from "@/utils/utils.ts";
import { Button } from "@components/ui/button.tsx";

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
  const defaultValue = "Board 1";
  const [name, setName] = useState(defaultValue)

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
            defaultValue={defaultValue}
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

export default CreateNewBoardDialog;