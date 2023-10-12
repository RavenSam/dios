"use client"

import { User } from "lucide-react"
import { useState } from "react"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"

const char = [
   {
      id: "gary",
      name: "Gary Goodspeed",
   },
   {
      id: "cato",
      name: "Little Cato",
   },
   {
      id: "kvn",
      name: "KVN",
   },
   {
      id: "mooncake",
      name: "Mooncake",
   },
   {
      id: "quinn",
      name: "Quinn Ergon",
   },
]

export default function TestDnD() {
   const [characters, setCharacters] = useState(char)

   const handleOnDragEnd = (result: DropResult) => {
      const items = Array.from(characters)
      const [reorderChar] = items.splice(result.source.index, 1)
      items.splice(result.destination?.index!, 0, reorderChar)

      setCharacters(items)
   }

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="">
            <h1 className="text-2xl font-bold mb-10 ">Final Characters</h1>

            <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="characters">
                  {(provided) => (
                     <ul className="space-y-4 p-4" {...provided.droppableProps} ref={provided.innerRef}>
                        {characters.map(({ id, name }, index) => {
                           return (
                              <Draggable key={id} draggableId={id} index={index}>
                                 {(provided) => (
                                    <li
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       className="rounded-lg border p-4 min-w-[20rem] bg-slate-100 flex items-center space-x-2"
                                    >
                                       <User />
                                       <p>{name}</p>
                                    </li>
                                 )}
                              </Draggable>
                           )
                        })}

                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </DragDropContext>
         </div>
      </div>
   )
}
