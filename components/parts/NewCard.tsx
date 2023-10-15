import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NewCard() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button aria-label="new" variant={"outline"} className="w-full hover:bg-purple-500 hover:text-white hover:border-purple-500">
               <Plus className="w-5 h-5" />
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-[600px]">
            <DialogHeader>
               <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>

            <DialogFooter></DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
