"use client"

import { useBoadStore } from "@/store"
import { Suspense, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Column from "@/components/parts/Column"
import Loading from "@/components/parts/Loading"
import handleOnDragEnd from "@/utils/handleOnDragEnd"

export default function Board() {
   const { getBoard, board, setBoard, updateTodoInDB } = useBoadStore()

   useEffect(() => getBoard(), [getBoard])

   return (
      <Suspense fallback={<Loading />}>
         <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, board, setBoard, updateTodoInDB)}>
            <Droppable droppableId="board" direction="horizontal" type="column">
               {(provided) => (
                  <div
                     className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto w-full"
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                  >
                     {Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column key={id} id={id} todos={column.todos} index={index} />
                     ))}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </Suspense>
   )
}
