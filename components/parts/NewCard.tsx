import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, Loader2, Pencil, Plus, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useBoadStore } from "@/store"
import { TypedColumn } from "@/type"
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function NewCard({ id }: { id: TypedColumn }) {
   const { newTaskInput, setNewTaskInput, setImage, addTask } = useBoadStore()
   const [open, setOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!newTaskInput) return

      setIsLoading(true)
      try {
         await addTask(id)

         setIsLoading(false)

         setNewTaskInput("")
         setImage(null)
         setOpen(false)
      } catch (error) {
         setIsLoading(false)
         console.log(error)
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
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

            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="my-2">
                  <Input
                     value={newTaskInput}
                     onChange={(e) => setNewTaskInput(e.target.value)}
                     placeholder="Enter a task here..."
                  />
               </div>

               <TaskRadioGroup id={id} />

               <UploadImage />

               <Button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-700 w-full"
                  disabled={!newTaskInput || isLoading}
               >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Task
               </Button>
            </form>
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
               <span>{radio.label}</span>
            </Label>
         ))}
      </RadioGroup>
   )
}

export function UploadImage() {
   const { setImage, image } = useBoadStore()

   const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
      if (event.key === "Enter") {
         document.getElementById("taskImage")?.click()
      }
   }

   const dropFile = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files![0].type.startsWith("image/")) return

      setImage(e.target.files![0])
   }

   return (
      <div className="">
         {image ? (
            <div className="relative group rounded-xl overflow-hidden">
               <Image
                  alt="uploaad image"
                  width={200}
                  height={200}
                  src={URL.createObjectURL(image)}
                  className="w-full h-44 object-cover"
               />

               <div className="absolute inset-0 bg-white/20  backdrop-blur flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 focus-within:opacity-100">
                  <Button
                     variant={"link"}
                     aria-label="change image"
                     onClick={(e) => setImage(null)}
                     className="opacity-80 hover:opacity-100 hover:no-underline bg-white/30"
                  >
                     <XIcon className="h-5 w-5 mr-2" />
                     Remove Image
                  </Button>
               </div>
            </div>
         ) : (
            <label
               onKeyDown={handleKeyDown}
               tabIndex={0}
               htmlFor="taskImage"
               className="border-2 border-dashed flex items-center justify-center rounded-lg p-6 hover:border-purple-600 hover:bg-purple-50 focus:border-purple-600 focus:bg-purple-50 transition duration-100 cursor-pointer outline-none"
            >
               <input id="taskImage" type="file" hidden onChange={dropFile} />

               <ImageIcon className="h-6 w-6 mr-4 opacity-50" />

               <span className="text-sm opacity-50">Upload Task Image</span>
            </label>
         )}
      </div>
   )
}
