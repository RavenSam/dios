import { Board, Column, TypedColumn } from "@/type"
import { getTodosGroupedByColumn } from "@/utils/get-funcs"
import { create } from "zustand"

interface BoardState {
   board: Board
   getBoard: () => void
}

export const useBoadStore = create<BoardState>()((set) => ({
   board: { columns: new Map<TypedColumn, Column>() },
   getBoard: async () => {
      const board = await getTodosGroupedByColumn()
      set({ board })
   },
}))
