import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, ClipboardList, Eye } from "lucide-react"
import { format } from "date-fns"
import { Todo } from "@/type"
import Editor from "@/components/editor"
import { Badge } from "@/components/ui/badge"

export default function CardDetail({ todo }: { todo: Todo }) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="link" size={"icon"} className="w-6 h-6 opacity-60 hover:opacity-100">
               <Eye className="w-4 h-4" />
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-[600px]">
            <DialogHeader>
               <DialogTitle>
                  {todo.title}
               </DialogTitle>
               <DialogDescription className="">
                  <div className="flex items-center gap-1">

                  <span className="text-xs flex items-center">
                     <ClipboardList className="w-4 h-4 mr-1" />
                     {todo.status}
                  </span>

                  <span className="text-purple-500">•</span>

                  <span className="text-xs flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     {format(new Date(todo.$createdAt), "PPP")}
                  </span>
                  </div>
               </DialogDescription>

               <div className="py-4 ">
                  <Editor content={todo.description} />
               </div>
            </DialogHeader>

            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
