import { ColumnProps, TypedColumn } from "@/type"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TodoCard from "@/components/parts/TodoCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const idToText: {
   [key in TypedColumn]: string
} = {
   todo: "To Do",
   inprogress: "In Progress",
   done: "Done",
}

export default function Column({ id, todos, index }: ColumnProps) {
   return (
      <Draggable draggableId={id} index={index}>
         {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
               <Droppable droppableId={index.toString()} type="card">
                  {(provided, snapshot) => (
                     <Card
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-2 rounded-lg shadow-sm ${snapshot.isDraggingOver ? "bg-purple-100" : "bg-muted"}`}
                     >
                        <CardHeader className="px-2 py-4 ">
                           <CardTitle className="flex items-center justify-between">
                              {idToText[id]}

                              <Badge variant="outline">{todos.length}</Badge>
                           </CardTitle>
                        </CardHeader>

                        <CardContent className="p-2 space-y-2">
                           {todos.map((todo, index) => (
                              <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                                 {(provided) => (
                                    <TodoCard
                                       id={id}
                                       index={index}
                                       todo={todo}
                                       draggableProps={provided.draggableProps}
                                       dragHandleProps={provided.dragHandleProps}
                                       innerRef={provided.innerRef}
                                    />
                                 )}
                              </Draggable>
                           ))}

                           {provided.placeholder}
                        </CardContent>

                        <CardFooter className="px-2 pb-1 ">
                           <Button aria-label="new" variant={"outline"} className="w-full roundxl">
                              <Plus className="w-5 h-5" />
                           </Button>
                        </CardFooter>
                     </Card>
                  )}
               </Droppable>
            </div>
         )}
      </Draggable>
   )
}
