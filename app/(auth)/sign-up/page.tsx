"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { createAccount, createUserSession } from "@/appwrite"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useUserStore } from "@/store/user"

export default function SignUp() {
   const router = useRouter()
   const [value, setValue] = useState({ name: "", email: "", password: "" })
   const [isLoading, setIsLoading] = useState(false)
   const { getUserSession } = useUserStore()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      const { email, name, password } = value

      try {
         await createAccount(email, password, name)

         await createUserSession(email, password)

         await getUserSession()

         setIsLoading(false)

         router.push("/")
      } catch (e) {
         setIsLoading(false)
         console.log(e)
         alert("Error creating user")
      }
   }
   return (
      <div className="max-w-6xl mx-auto p-4">
         <div className="grid grid-cols-2 gap-8">
            <div className="rounded-xl w-full h-full relative overflow-hidden">
               <Image src="/image.jpg" layout="fill" alt="Sign up" objectFit="cover" objectPosition="center" />

               <div className="absolute rounded-2xl bottom-4 left-4 right-4 p-4 bg-white/20 text-white backdrop-blur shadow">
                  <p className="drop-shadow-xl">
                     Join us and unlock the power of efficient task management! Sign up today to start creating boards, organizing tasks, and collaborating with ease. Experience the simplicity of staying on top of your projects, whether at work or at home. Get started now and revolutionize the way you work.
                  </p>
               </div>
            </div>

            <div className="space-y-6 max-w-lg mx-auto w-full min-h-[95vh] flex flex-col justify-center">
               <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Sign up
               </h2>

               <form onSubmit={handleSubmit}>
                  <fieldset className="space-y-8 " disabled={isLoading}>
                     <div className="grid w-full max-w-lg items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                           onChange={handleChange}
                           value={value.name}
                           type="text"
                           id="name"
                           name="name"
                           placeholder="Your name"
                           required
                        />
                     </div>

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
                     <p className="opacity-70">You already have an account?</p>{" "}
                     <Link href="/sign-in" className="ml-2 text-purple-400 hover:text-purple-600 font-medium">
                        Sign in
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}
