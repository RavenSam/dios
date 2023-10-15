import Board from "@/components/sections/Board"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Home() {
   const cookieStore = cookies()
   const isLogged = cookieStore.has("user")

   if (!isLogged) {
      return redirect("/sign-in")
   }

   return (
      <div className="max-w-6xl mx-auto p-4">
         <Board />
      </div>
   )
}
