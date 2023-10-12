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
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DeleteCard() {
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
