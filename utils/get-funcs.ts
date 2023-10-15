import { databases, getAccount } from "@/appwrite"
import { Board, Column, TypedColumn } from "@/type"
import { redirect } from "next/navigation"

export const getTodosGroupedByColumn = async () => {
   const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DB_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
   )

   const todos = data.documents

   // Restructure data ---
   // { todo -> { id:todo, todos:[...] },
   //   inprogress -> { id:inprogress, todos:[...] },
   //   done -> { id:done, todos:[...] } }
   const columns = todos.reduce((acc, todo) => {
      if (!acc.get(todo.status)) {
         acc.set(todo.status, { id: todo.status, todos: [] })
      }

      acc.get(todo.status)!.todos.push({
         $id: todo.$id,
         $createdAt: todo.$createdAt,
         $updatedAt: todo.$updatedAt,
         title: todo.title,
         status: todo.status,
         description: todo.description,
         ...(todo.image && { image: JSON.parse(todo.image.fileId) }),
      })

      return acc
   }, new Map<TypedColumn, Column>())

   // if the column doesn't have any todos, inprogress, or done add empty columns array
   const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"]
   for (const columnType of columnTypes) {
      if (!columns.get(columnType)) {
         columns.set(columnType, { id: columnType, todos: [] })
      }
   }

   // Sort the columns in columnsTypes order ---
   //  1-> todo | 2 -> inprogress | 3 -> done
   const sortedColumns = new Map(
      Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
   )

   const board: Board = { columns: sortedColumns }

   return board
}

export const getSession = async () => {
   try {
      const user = await getAccount()

      await fetch("/api/auth", {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({ user }),
      })

      return user
   } catch (e) {
      console.log(e)
   }
}
