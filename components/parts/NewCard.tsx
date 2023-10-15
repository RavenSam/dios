import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useBoadStore } from "@/store"
import { TypedColumn } from "@/type"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function NewCard({ id }: { id: TypedColumn }) {
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

            <TaskRadioGroup id={id} />

            <DialogFooter></DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export function TaskRadioGroup({ id }: { id: TypedColumn }) {
   const [value, setValue] = useState<string>(id)

   const radioList = [
      { label: "To Do", value: "todo" },
      { label: "In Progress", value: "inprogress" },
      { label: "Done", value: "done" },
   ]

   const handleChange = (value: string) => {
      setValue(value)
   }

   return (
      <RadioGroup onValueChange={handleChange} defaultValue={id}>
         {radioList.map((radio, index) => (
            <Label
               key={index}
               htmlFor={(index + 1).toString()}
               className={cn(
                  "flex items-center space-x-2 border px-3 py-6 rounded-lg cursor-pointer",
                  value == radio.value && "border-purple-600 bg-purple-50 shadow"
               )}
            >
               <RadioGroupItem value={radio.value} id={(index + 1).toString()} />
               <span >{radio.label}</span>
            </Label>
         ))}
      </RadioGroup>
   )
}
