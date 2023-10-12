import { Todo, TodoCardProps } from "@/type"
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
import { Calendar, Eye, Trash } from "lucide-react"
import { format } from "date-fns"

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Editor from "@/components/editor"

export default function TodoCard(props: TodoCardProps) {
   return (
      <div
         ref={props.innerRef}
         {...props.draggableProps}
         {...props.dragHandleProps}
         className="border rounded-lg group p-2.5 shadow-sm bg-background"
      >
         <div className="flex justify-between">
            <div className="">
               <h4>
                  {props.todo.title} {props.todo.title}
               </h4>
            </div>

            <div className="flex flex-col items-center pl-2 opacity-0 group-hover:opacity-100">
               <TodoDetail todo={props.todo} />
               <DeleteTodo />
            </div>
         </div>
      </div>
   )
}

function TodoDetail({ todo }: { todo: Todo }) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="link" size={"icon"} className="w-6 h-6 opacity-60 hover:opacity-100">
               <Eye className="w-4 h-4" />
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-[600px]">
            <DialogHeader>
               <DialogTitle>{todo.title}</DialogTitle>
               <DialogDescription className="">
                  <span className="text-xs flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     {format(new Date(todo.$updatedAt || todo.$createdAt), "PPP")}
                  </span>
               </DialogDescription>
            </DialogHeader>

            <div className="py-4">
               <Editor />
            </div>

            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export function DeleteTodo() {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="link" size={"icon"} className="w-6 h-6 text-pink-500 opacity-60 hover:opacity-100">
               <Trash className="w-4 h-4" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Delete Todo Card</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your todo and remove your data from our
                  servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction className="bg-pink-600">Delete</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
