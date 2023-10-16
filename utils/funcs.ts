import { storage } from "@/appwrite"
import { ID } from "appwrite"

export const intials = (fullName: string | undefined) =>
   fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()

export const uploadImage = async (image: File) => {
   if (!image) return

   return await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), image)
}
