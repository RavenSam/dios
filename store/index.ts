import { databases, storage } from "@/appwrite"
import { Board, Column, Image, Todo, TypedColumn } from "@/type"
import { uploadImage } from "@/utils/funcs"
import { getTodosGroupedByColumn } from "@/utils/get-funcs"
import { ID } from "appwrite"
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
   addTask: (columnId: TypedColumn) => void

   newTaskInput: string
   setNewTaskInput: (input: string) => void

   image: File | null
   setImage: (image: File | null) => void
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

   addTask: async (columnId: TypedColumn) => {
      const { newTaskInput, image } = get()

      let file: Image | undefined

      if (image) {
         const fileUploaded = await uploadImage(image)
         if (fileUploaded) {
            file = { bucketId: fileUploaded.bucketId, fileId: fileUploaded.$id }
         }
      }

      const todo = await databases.createDocument(
         process.env.NEXT_PUBLIC_DB_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         ID.unique(),
         { title: newTaskInput, status: columnId, ...(file && { image: JSON.stringify(file) }) }
      )

      set((state) => {
         const newColumns = new Map(state.board.columns)

         const newTodo: Todo = {
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            $updatedAt: todo.$updatedAt,
            title: todo.title,
            status: todo.status,
            description: todo.description,
            ...(todo.image && { image: JSON.parse(todo.image) }),
         }

         const column = newColumns.get(columnId)

         if (!column) {
            newColumns.set(columnId, { id: columnId, todos: [newTodo] })
         } else {
            newColumns.get(columnId)?.todos.push(newTodo)
         }

         return { board: { columns: newColumns } }
      })
   },

   newTaskInput: "",
   setNewTaskInput: (input: string) => set({ newTaskInput: input }),

   image: null,
   setImage: (image: File | null) => set({ image }),
}))
