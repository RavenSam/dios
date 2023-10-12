"use client"

import { useBoadStore } from "@/store"
import { Suspense, useEffect } from "react"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"
import Column from "@/components/parts/Column"
import Loading from "@/components/parts/Loading"

export default function Board() {
   const { getBoard, board } = useBoadStore()

   useEffect(() => getBoard(), [getBoard])

   const handleOnDragEnd = (result: DropResult) => {
      console.log(result)
   }

   return (
      <Suspense fallback={<Loading />}>
         <DragDropContext onDragEnd={handleOnDragEnd}>
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
