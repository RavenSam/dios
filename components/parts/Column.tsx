import { ColumnProps } from "@/type"
import { Draggable, Droppable } from "react-beautiful-dnd"
import Task from "@/components/parts/Task"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Column({ id, todos, index }: ColumnProps) {
   return (
      <Draggable draggableId={id} index={index}>
         {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
               <Droppable droppableId={index.toString()} type="card">
                  {(provided, snapshot) => (
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-2 rounded-lg shadow-sm ${
                           snapshot.isDraggingOver ? "bg-green-200" : "bg-black/50"
                        }`}
                     >
                        {id}
                     </div>
                  )}
               </Droppable>
            </div>
         )}
      </Draggable>
   )
}
