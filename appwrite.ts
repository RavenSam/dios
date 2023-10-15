import { Client, Account, ID, Databases, Storage } from "appwrite"

export const client = new Client()

client
   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_URL!)
   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const databases = new Databases(client)
export const storage = new Storage(client)
export const account = new Account(client)

export const createAccount = (email: string, password: string, name: string) =>
   account.create(ID.unique(), email, password, name)

export const createUserSession = (email: string, password: string) => account.createEmailSession(email, password)

export const getAccount = () => account.get()

export const logout = () => account.deleteSession("current")

