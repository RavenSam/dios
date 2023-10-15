import { cookies } from "next/headers"

export async function POST(req: Request) {
   const { user, logout } = await req.json()

   if (logout) {
      cookies().delete("user")

      return Response.json({ msg: "Logged out successfully" })
   }

   if (user) {
      cookies().set({
         name: "user",
         value: JSON.stringify(user),
         httpOnly: true,
         path: "/",
      })

      return Response.json({ user })
   }

   return Response.json({ error: "POST Resquest missing params -- user or logout" })
}
