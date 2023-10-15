import { ColumnProps, TypedColumn } from "@/type"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TodoCard from "@/components/parts/TodoCard"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useBoadStore } from "@/store"
import NewCard from "@/components/parts/NewCard"

const idToText: {
   [key in TypedColumn]: string
} = {
   todo: "To Do",
   inprogress: "In Progress",
   done: "Done",
}

export default function Column({ id, todos, index }: ColumnProps) {
   const [dragging, setDragging] = useState(false)
   const { searchString } = useBoadStore()

   return (
      <Draggable draggableId={id} index={index}>
         {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
               <Card className={`relative p-2 rounded-lg shadow-sm ${dragging ? "bg-purple-200" : "bg-muted"}`}>
                  <CardHeader className="px-2 py-4 ">
                     <CardTitle className="flex items-center justify-between">
                        {idToText[id]}

                        <Badge variant="outline">
                           {!searchString
                              ? todos.length
                              : todos.filter((todo) =>
                                   todo.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
                                ).length}
                        </Badge>
                     </CardTitle>
                  </CardHeader>

                  <Droppable droppableId={index.toString()} type="card">
                     {(provided, snapshot) => {
                        snapshot.isDraggingOver ? setDragging(true) : setDragging(false)

                        return (
                           <CardContent
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={`p-2 space-y-2  `}
                           >
                              {todos.map((todo, index) => {
                                 if (
                                    searchString &&
                                    !todo.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
                                 )
                                    return

                                 return (
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
                                 )
                              })}

                              {provided.placeholder}
                           </CardContent>
                        )
                     }}
                  </Droppable>

                  <CardFooter className="px-2 pb-1 ">
                     <NewCard id={id}/>
                  </CardFooter>
               </Card>
            </div>
         )}
      </Draggable>
   )
}
