import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useBoadStore } from "@/store"
import { TypedColumn } from "@/type"

export default function NewCard({ id }:{id:TypedColumn}) {
   const { newTaskInput, setNewTaskInput } = useBoadStore()

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               aria-label="new"
               variant={"outline"}
               className="w-full hover:bg-purple-500 hover:text-white hover:border-purple-500"
            >
               <Plus className="w-5 h-5" />
            </Button>
         </DialogTrigger>
         <DialogContent className="">
            <DialogHeader>
               <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>

            <div className="my-2">
               <Input
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="Enter a task here..."
               />
            </div>

            <TaskRadioGroup id={id}/>

            <DialogFooter></DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export function TaskRadioGroup({ id }:{id:TypedColumn}) {
   const radioList = [
      { label: "To Do", value: "todo" },
      { label: "In Progress", value: "inprogress" },
      { label: "Done", value: "done" },
   ]

   return (
      <RadioGroup defaultValue={id}>
         {radioList.map((radio, index) => (
            <div key={index} className="flex items-center space-x-2 border px-3 py-6 rounded-lg">
               <RadioGroupItem value={radio.value} id={(index + 1).toString()} />
               <Label htmlFor={(index + 1).toString()}>{radio.label}</Label>
            </div>
         ))}
      </RadioGroup>
   )
}

