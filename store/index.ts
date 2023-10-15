import { databases, storage } from "@/appwrite"
import { Board, Column, Todo, TypedColumn } from "@/type"
import { getTodosGroupedByColumn } from "@/utils/get-funcs"
import { create } from "zustand"

interface BoardState {
   board: Board
   getBoard: () => void
   setBoard: (board: Board) => void
   updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void

   loadingBoard: boolean

   searchString: string
   setSearchString: (searchString: string) => void

   deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void

   newTaskInput: string
   setNewTaskInput: (input: string) => void
}

export const useBoadStore = create<BoardState>()((set, get) => ({
   board: { columns: new Map<TypedColumn, Column>() },

   getBoard: async () => {
      set({ loadingBoard: true })
      const board = await getTodosGroupedByColumn()
      set({ board, loadingBoard: false })
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

   loadingBoard: false,

   searchString: "",

   setSearchString: (searchString: string) => set({ searchString }),

   deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
      const newColumns = new Map(get().board.columns)

      newColumns.get(id)?.todos.splice(taskIndex, 1)

      set({ board: { columns: newColumns } })

      if (todo.image) {
         await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
      }

      await databases.deleteDocument(
         process.env.NEXT_PUBLIC_DB_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         todo.$id
      )
   },

   newTaskInput: "",
   setNewTaskInput: (input: string) => set({ newTaskInput: input }),
}))
