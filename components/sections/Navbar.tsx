"use client"

import { Check, LogOut, Plus, Search, Settings, User, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBoadStore } from "@/store"
import { useUserStore } from "@/store/user"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { intials } from "@/utils/funcs"

export default function Navbar() {
   const { searchString, setSearchString } = useBoadStore()
   const { getUserSession } = useUserStore()
   const path = usePathname()

   useEffect(() => {
      getUserSession()
   }, [getUserSession])

   if (["/sign-in", "/sign-up"].includes(path)) return

   return (
      <header className="p-4 md:px-8">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <Check className="h-6 w-6 text-purple-500" />
               <span className="tracking-widest font-semibold">Dos.</span>
            </div>

            <div className="flex items-center gap-3">
               <div className="border rounded-lg flex items-center relative ">
                  <Input
                     className="border-none pr-8 bg-muted/60 hover:bg-muted focus:bg-background duration-300 transition"
                     placeholder="Search a todo..."
                     value={searchString}
                     onChange={(e) => setSearchString(e.target.value)}
                  />

                  <button
                     type="submit"
                     className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-2 opacity-50"
                  >
                     <Search className="h-5 w-5" />
                  </button>
               </div>

               <UserMenu />
            </div>
         </div>
      </header>
   )
}

function UserMenu() {
   const { userSession, signOut } = useUserStore()
   const router = useRouter()

   const menuList = [
      { label: "Profile", icon: User },
      { label: "New", icon: Plus },
      { label: "Team", icon: Users },
      { label: "Settings", icon: Settings },
   ]

   const logOut = () => {
      signOut()
      router.push("/sign-in")
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
               <Avatar>
                  <AvatarFallback>{intials(userSession?.name)}</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userSession?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userSession?.email}</p>
               </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {menuList.map((item) => (
               <DropdownMenuItem className="cursor-pointer" key={item.label} disabled>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
               </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
               <LogOut className="mr-2 h-4 w-4" />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
