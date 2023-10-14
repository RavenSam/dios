import { databases } from "@/appwrite"
import { Board, Column, Todo, TypedColumn } from "@/type"
import { getTodosGroupedByColumn } from "@/utils/get-funcs"
import { create } from "zustand"

interface BoardState {
   board: Board
   getBoard: () => void
   setBoard: (board: Board) => void
   updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
}

export const useBoadStore = create<BoardState>()((set) => ({
   board: { columns: new Map<TypedColumn, Column>() },

   getBoard: async () => {
      const board = await getTodosGroupedByColumn()
      set({ board })
   },

   setBoard: (board) => set({ board }),

   updateTodoInDB: async (todo, columnId) => {
      await databases.updateDocument(
         process.env.NEXT_PUBLIC_DB_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         todo.$id,
         { title: todo.title, status: columnId }
      )
   },
}))
