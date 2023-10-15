"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { createUserSession } from "@/appwrite"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useUserStore } from "@/store/user"

export default function SignIn() {
   const router = useRouter()
   const [value, setValue] = useState({ email: "", password: "" })
   const [isLoading, setIsLoading] = useState(false)
   const { getUserSession } = useUserStore()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      const { email, password } = value

      try {
         await createUserSession(email, password)

         await getUserSession()

         setIsLoading(false)

         router.push("/")
      } catch (e) {
         setIsLoading(false)
         console.log(e)
         alert("Incorrect email or password!!!")
      }
   }
   return (
      <div className="max-w-6xl mx-auto p-4">
         <div className="grid grid-cols-2 gap-8">
            <div className="rounded-xl w-full h-full relative overflow-hidden">
               <Image src="/image.jpg" layout="fill" alt="Sign up" objectFit="cover" objectPosition="center" />

               <div className="absolute rounded-2xl bottom-4 left-4 right-4 p-4 bg-white/20 text-white backdrop-blur shadow">
                  <p className="drop-shadow-xl">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dignissimos animi quasi non sit.
                     Commodi error animi quam maxime quis.
                  </p>
               </div>
            </div>

            <div className="space-y-6 max-w-lg mx-auto w-full min-h-[95vh] flex flex-col justify-center">
               <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Sign in
               </h2>

               <form onSubmit={handleSubmit}>
                  <fieldset className="space-y-8 " disabled={isLoading}>
                     <div className="grid w-full max-w-lg items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           onChange={handleChange}
                           value={value.email}
                           type="email"
                           id="email"
                           name="email"
                           placeholder="email@exemple.com"
                           required
                        />
                     </div>

                     <div className="grid w-full max-w-lg items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                           onChange={handleChange}
                           value={value.password}
                           type="password"
                           id="password"
                           name="password"
                           placeholder="********"
                           required
                        />
                     </div>

                     <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign up
                     </Button>
                  </fieldset>

                  <div className="flex mt-6">
                     <p className="opacity-70">You dont have an account?</p>{" "}
                     <Link href="/sign-up" className="ml-2 text-purple-400 hover:text-purple-600 font-medium">
                        Sign up
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}
