import { Board, Column, Todo, TypedColumn } from "@/type"
import { DropResult } from "react-beautiful-dnd"

export default function handleOnDragEnd(
   result: DropResult,
   board: Board,
   setBoard: (board: Board) => void,
   updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void
) {
   const { destination, source, type } = result

   if (!destination) return

   // Handle column drag
   if (type === "column") {
      const entries = Array.from(board.columns.entries())
      const [removed] = entries.splice(source.index, 1)
      entries.splice(destination.index, 0, removed)
      const rearangedColumn = new Map(entries)
      setBoard({ ...board, columns: rearangedColumn })

      return
   }

   // This step is needed as the indexes are stored as number insteaadof id's
   const columns = Array.from(board.columns)
   const startColIndex = columns[Number(source.droppableId)]
   const endColIndex = columns[Number(destination.droppableId)]

   const startCol: Column = { id: startColIndex[0], todos: startColIndex[1].todos }
   const endCol: Column = { id: endColIndex[0], todos: endColIndex[1].todos }

   if (!startCol || !endCol) return

   if (source.index === destination.index && startCol === endCol) return

   const newTodos = startCol.todos
   const [todoMoved] = newTodos.splice(source.index, 1)

   if (startCol.id === endCol.id) {
      // Same column task drag

      newTodos.splice(destination.index, 0, todoMoved)
      const newCol = { id: startCol.id, todos: newTodos }

      const newColumns = new Map(board.columns)
      newColumns.set(startCol.id, newCol)

      setBoard({ ...board, columns: newColumns })
   } else {
      // Draging to another column
      const endTodos = Array.from(endCol.todos)
      endTodos.splice(destination.index, 0, todoMoved)

      const newColumns = new Map(board.columns)
      const newCol = { id: startCol.id, todos: newTodos }

      newColumns.set(startCol.id, newCol)
      newColumns.set(endCol.id, { id: endCol.id, todos: endTodos.map((todo) => ({ ...todo, status: endCol.id })) })

      updateTodoInDB(todoMoved, endCol.id)

      setBoard({ ...board, columns: newColumns })
   }
}
