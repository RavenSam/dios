"use client"

import { Check, LogOut, Plus, Search, Settings, Snowflake, User, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Navbar() {
   const handleSearch = (e: any) => {
      e.preventDefault()
      console.log(e)
   }

   return (
      <header className="p-4 md:px-8">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <Check className="h-6 w-6 text-purple-500" />
               <span className="tracking-widest font-semibold">Dos.</span>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
               <form onSubmit={handleSearch} className="border rounded-lg flex items-center relative ">
                  <Input
                     className="border-none pr-8 bg-slate-100 hover:bg-slate-200 focus:bg-background duration-300 transition"
                     placeholder="Search a todo..."
                  />

                  <button
                     type="submit"
                     className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-2 opacity-50"
                  >
                     <Search className="h-5 w-5" />
                  </button>
               </form>

               <UserMenu />
            </div>
         </div>
      </header>
   )
}

const UserMenu = () => {
   const menuList = [
      { label: "Profile", icon: User },
      { label: "New", icon: Plus },
      { label: "Team", icon: Users },
      { label: "Settings", icon: Settings },
   ]

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
               <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className="w-44" align="end">
            {menuList.map((item) => (
               <DropdownMenuItem className="cursor-pointer" key={item.label}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
               </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
               <LogOut className="mr-2 h-4 w-4" />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
